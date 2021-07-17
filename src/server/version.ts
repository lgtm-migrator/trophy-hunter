import { Request, Response } from 'express';
import { getJSON } from '../api/utils/request';

export const currentSeason = '11';
const cachedVersion = {
  timestamp: 0,
  promise: null,
};

export const getRecentVersion = async () => {
  try {
    if (cachedVersion.timestamp < Date.now() - 1000 * 60 * 60) {
      cachedVersion.promise = getJSON<string[]>(
        'https://ddragon.leagueoflegends.com/api/versions.json'
      );
      cachedVersion.timestamp = Date.now();
    }
    const versions = await cachedVersion.promise;
    return versions[0];
  } catch (error) {
    console.error(`getRecentVersion ${error.status} ${error.statusText}`);
    return null;
  }
};

export const handleGetVersion = async (_req: Request, res: Response) => {
  const version = await getRecentVersion();

  res.setHeader('Cache-Control', 'max-age=180');
  res.json({
    riot: version,
    season: currentSeason,
  });
};
