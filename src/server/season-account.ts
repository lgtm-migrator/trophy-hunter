import { Request, Response } from 'express';
import {
  getAccountsCollection,
  getSeasonAccountsCollection,
} from '../app/lib//accounts/server/collection';

export const handleGetSeasonAccount = async (req: Request, res: Response) => {
  const { authToken } = req.cookies;
  const activeSeason =
    typeof req.query?.season === 'string' ? req.query?.season : null;
  if (!authToken || !activeSeason) {
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
        process.env.NODE_ENV === 'production' ? 'Secure' : ''
      }`
    );

    return res.status(401).end('Unauthorized');
  }

  const SeasonAccounts = await getSeasonAccountsCollection();
  const seasonAccount = await SeasonAccounts.findOne({
    'summoner.accountId': account.summoner.accountId,
  });
  if (!seasonAccount) {
    return res.status(404).end('Not found');
  }
  seasonAccount.rank =
    (await SeasonAccounts.find({
      season: activeSeason,
      $or: [
        { trophiesCompleted: { $gt: seasonAccount.trophiesCompleted } },
        {
          trophiesCompleted: seasonAccount.trophiesCompleted,
          'summoner.revisionDate': {
            $gt: seasonAccount.summoner.revisionDate,
          },
        },
      ],
    }).count()) + 1;
  res.json(seasonAccount);
};
