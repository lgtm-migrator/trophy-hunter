import { Request, Response } from 'express';
import { getAccountsCollection } from '../app/lib//accounts/server/collection';

export const handleGetPublicAccount = async (req: Request, res: Response) => {
  const { summonerName, platformId } = req.query;
  if (typeof summonerName !== 'string' || typeof platformId !== 'string') {
    return res.status(400).end('Invalid query');
  }

  const Accounts = await getAccountsCollection();
  const account = await Accounts.findOne({
    'summoner.name': summonerName,
    'summoner.platformId': platformId,
  });
  if (!account) {
    return res.status(404).end('Not found');
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
