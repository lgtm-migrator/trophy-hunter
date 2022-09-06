import { Request, Response } from 'express';
import { getAccountsCollection } from '../app/lib//accounts/server/collection';

export const handleGetAccount = async (req: Request, res: Response) => {
  const { authToken } = req.cookies;
  if (!authToken) {
    return res.status(401).end('Unauthorized');
  }

  const Accounts = await getAccountsCollection();
  const account = await Accounts.findOne({
    authTokens: {
      $elemMatch: {
        token: authToken,
        expiresAt: { $gt: new Date() },
      },
    },
  });
  if (!account) {
    res.setHeader(
      'Set-Cookie',
      `authToken=${authToken};path=/;Max-Age=0;HttpOnly;SameSite=None;${
        process.env.NODE_ENV === 'development' ? '' : 'Secure'
      }`
    );

    return res.status(401).end('Unauthorized');
  }
  account.rank =
    (await Accounts.find({
      $or: [
        { trophiesCompleted: { $gt: account.trophiesCompleted } },
        {
          trophiesCompleted: account.trophiesCompleted,
          'summoner.revisionDate': { $gt: account.summoner.revisionDate },
        },
      ],
    }).count()) + 1;
  res.json(account);
};
