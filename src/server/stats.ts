import { Request, Response } from 'express';
import { getAccountsCollection } from '../api/accounts/server/collection';
import { StatsObj } from '../api/stats/types';
import { THREE_MINUTES } from '../api/utils/dates';

type Stats = {
  _id: string;
  completed: number;
  total: number;
};

const getStatsObj = async () => {
  const Accounts = await getAccountsCollection();
  const stats = await Accounts.aggregate<Stats>([
    {
      $match: {
        trophies: { $elemMatch: { name: 'playstyle', status: 'completed' } },
      },
    },
    { $unwind: '$trophies' },
    {
      $group: {
        _id: '$trophies.name',
        completed: {
          $sum: { $cond: [{ $eq: ['$trophies.status', 'completed'] }, 1, 0] },
        },
        total: { $sum: 1 },
      },
    },
  ]).toArray();
  const statsObj = stats.reduce<StatsObj>(
    (previous, current) => ({
      ...previous,
      [current._id]: {
        completed: current.completed,
        total: current.total,
      },
    }),
    {}
  );
  return statsObj;
};

const cache = {
  timestamp: 0,
  promise: null,
};
export const handleGetStats = async (_req: Request, res: Response) => {
  if (cache.timestamp < Date.now() - THREE_MINUTES) {
    cache.promise = getStatsObj();
    cache.timestamp = Date.now();
  }

  const statsObj = await cache.promise;

  res.setHeader('Cache-Control', 'max-age=180');
  res.json(statsObj);
};
