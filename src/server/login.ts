import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Ajv from 'ajv';
import { getAccountsCollection } from '../app/lib//accounts/server/collection';
import { ONE_YEAR } from '../app/lib//utils/dates';
import { getSummoner } from '../app/lib//riot/server';
import { partialNewAccount } from '../app/lib//accounts/server';

export const handlePostLogin = async (req: Request, res: Response) => {
  const ajv = new Ajv();
  const valid = ajv.validate(
    {
      type: 'object',
      properties: {
        summonerName: {
          type: 'string',
        },
        platformId: {
          type: 'string',
        },
      },
      required: ['summonerName', 'platformId'],
    },
    req.body
  );
  if (!valid) {
    return res.status(422).json(ajv.errors);
  }

  const { summonerName, platformId } = req.body;
  const { authToken: oldAuthToken } = req.cookies;

  const Accounts = await getAccountsCollection();

  const summoner = await getSummoner({ summonerName, platformId });
  if (!summoner) {
    return res.status(404).end('Summoner not found');
  }

  const authToken = jwt.sign(
    { accountId: summoner.accountId },
    process.env.JWT_SECRET,
    {
      expiresIn: ONE_YEAR / 1000,
    }
  );

  const now = Date.now();
  const expiresAt = new Date(now + ONE_YEAR);
  const account = await Accounts.findOneAndUpdate(
    {
      'summoner.accountId': summoner.accountId,
    },
    {
      $set: {
        summoner,
      },
      $addToSet: {
        authTokens: {
          token: authToken,
          expiresAt: expiresAt,
        },
      },
      $setOnInsert: partialNewAccount,
    },
    {
      upsert: true,
      returnDocument: 'after',
    }
  );

  if (!account.ok) {
    throw account.lastErrorObject;
  }
  res.setHeader(
    'Set-Cookie',
    `authToken=${authToken};path=/;Max-Age=${
      ONE_YEAR / 1000
    };HttpOnly;SameSite=None;${
      process.env.NODE_ENV === 'production' ? 'Secure' : ''
    }`
  );
  res.json(account.value);

  if (oldAuthToken && account.value) {
    try {
      const { accountId } = jwt.verify(oldAuthToken, process.env.JWT_SECRET);

      // Limit to 5 authTokens
      for (let i = 5; i < account.value.authTokens.length; i++) {
        await Accounts.updateOne(
          { 'summoner.accountId': accountId },
          {
            $pop: {
              authTokens: -1,
            },
          }
        );
      }
    } catch (error) {
      console.error('Invalid oldAuthToken');
    }
  }
};
