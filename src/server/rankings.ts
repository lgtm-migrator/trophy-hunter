import { Request, Response } from 'express';
import {
  getRankings,
  searchRankingBySummonerName,
} from '../api/accounts/server/functions';

export const handleGetRankings = async (req: Request, res: Response) => {
  const { season, page: pageString, summonerName } = req.query;
  if (typeof season !== 'string') {
    res.status(400).send('Invalid query');
    return;
  }
  const page = typeof pageString === 'string' ? +pageString : 0;

  const rankings =
    typeof summonerName === 'string'
      ? await searchRankingBySummonerName(season, summonerName)
      : await getRankings(season, page);

  res.setHeader('Cache-Control', 'max-age=180');
  res.json(rankings);
};
