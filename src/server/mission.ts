import { Request, Response } from 'express';
import { getMissionsCollection } from '../app/lib//missions/server/collection';

export const handleGetMission = async (_req: Request, res: Response) => {
  const activeMission = await getMissionsCollection().findOne({
    active: true,
  });

  res.setHeader('Cache-Control', 'max-age=180');
  res.json(activeMission);
};
