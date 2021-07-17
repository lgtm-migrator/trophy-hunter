import { Request, Response } from 'express';
import { getTrophyStats } from '../api/stats/server';

export const handleGetTrophyStats = async (req: Request, res: Response) => {
  const { name } = req.params;
  res.setHeader('Cache-Control', 'max-age=180');
  const trophyStats = await getTrophyStats(name);
  if (trophyStats.length === 0) {
    return res.status(404).end('Not found');
  }
  res.json(trophyStats[0]);
};
