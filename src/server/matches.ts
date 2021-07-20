import { Request, Response } from 'express';
import { Filter } from 'mongodb';
import { getAccountsCollection } from '../app/lib//accounts/server/collection';
import type { Account } from '../app/lib//accounts/types';
import { getHistoryMatches } from '../app/lib//matches/server/functions';

export const handleGetMatches = async (req: Request, res: Response) => {
  const {
    summonerName,
    platformId,
    onlyWithTrophies: onlyWithTrophiesString,
    page: pageString,
  } = req.query;
  const onlyWithTrophies = onlyWithTrophiesString
    ? onlyWithTrophiesString === 'true'
    : false;
  const page = pageString ? +pageString : 0;

  let query: Filter<Account> = {
    'summoner.name': summonerName,
    'summoner.platformId': platformId,
  };
  if (!summonerName || !platformId) {
    const { authToken } = req.cookies;
    if (!authToken) {
      return res.status(401).end('Unauthorized');
    }
    query = {
      authTokens: {
        $elemMatch: {
          token: authToken,
          expiresAt: { $gt: new Date() },
        },
      },
    };
  }

  const Accounts = await getAccountsCollection();
  const account = await Accounts.findOne(query);
  if (!account) {
    return res.status(404).end('Not found');
  }

  const result = await getHistoryMatches(account._id, onlyWithTrophies, page);

  res.setHeader('Cache-Control', 'max-age=180');
  res.json(result);
};
