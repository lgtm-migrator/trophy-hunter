import { Request, Response } from 'express';
import { getChampions } from '../api/riot/server';
import { getRecentVersion } from './version';

export const handleGetImg = async (req: Request, res: Response) => {
  const { championId } = req.params;

  const champions = await getChampions();
  const champion = champions.find(
    (champion) => champion.key === championId.toString()
  );
  if (!champion) {
    return res.status(404).end('Not found');
  }
  res.setHeader('Cache-Control', 'max-age=180');
  const version = await getRecentVersion();
  res.redirect(
    `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`
  );
};
