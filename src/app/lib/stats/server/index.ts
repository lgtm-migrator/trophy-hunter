import { getChampions } from '../../riot/server';
import { TrophyStatsAggregationObj } from '../types';
import { getTrophyStatsCollection } from './collection';

export const getTrophyStats = async (trophyName: string) => {
  const champions = await getChampions();

  const TrophyStats = await getTrophyStatsCollection();
  return TrophyStats.aggregate<TrophyStatsAggregationObj>([
    {
      $match: {
        trophyName: trophyName,
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $group: {
        _id: '$trophyName',
        totalChecks: {
          $sum: '$checks',
        },
        totalCount: {
          $sum: '$count',
        },
        top: {
          $push: {
            championId: '$championId',
            mapId: '$mapId',
            checks: '$checks',
            count: '$count',
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        trophyName: '$_id',
        totalChecks: 1,
        totalCount: 1,
        top: {
          $slice: ['$top', 5],
        },
      },
    },
  ])
    .map((result) => ({
      ...result,
      top: result.top.map((top) => ({
        ...top,
        championName:
          champions.find(
            (champion) => champion.key === top.championId.toString()
          )?.name || 'Unknown',
      })),
    }))
    .toArray();
};

type UpdateTrophyStatsProps = {
  trophyName: string;
  mapId: number;
  championId: number;
  obtained: boolean;
};
export const updateTrophyStats = async ({
  trophyName,
  mapId,
  championId,
  obtained,
}: UpdateTrophyStatsProps) => {
  const TrophyStats = await getTrophyStatsCollection();
  return TrophyStats.updateOne(
    {
      trophyName,
      mapId,
      championId,
    },
    {
      $inc: {
        checks: 1,
        count: +obtained,
      },
    },
    {
      upsert: true,
    }
  );
};
