import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';

const teamwork8: LevelServer = {
  ...base,
  trophies: [
    trophies.preserver,
    trophies.rockSolid,
    trophies.rockSurfing,
    trophies.theHound,
    trophies.theRoam,
    trophies.thorsHammer,
    trophies.visionGame,
  ],
  unlocksLevels: [],
};

export default teamwork8;
