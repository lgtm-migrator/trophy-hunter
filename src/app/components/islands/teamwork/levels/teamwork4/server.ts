import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import teamwork5 from '../teamwork5/server';

const teamwork4: LevelServer = {
  ...base,
  trophies: [
    trophies.quackery,
    trophies.quadraAssist,
    trophies.radar,
    trophies.rejuvenation,
    trophies.sasquatch,
    trophies.theBull,
    trophies.theCompanion,
  ],
  unlocksLevels: [teamwork5],
};

export default teamwork4;
