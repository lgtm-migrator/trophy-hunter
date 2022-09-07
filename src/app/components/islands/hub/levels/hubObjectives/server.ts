import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import { objectives1 } from '../../../objectives/levels/server';

const hubObjectives: LevelServer = {
  ...base,
  trophies: [
    trophies.siegeRam,
    trophies.theViking,
    trophies.dragonHunter,
    trophies.scroungerAssistent,
    trophies.shelly,
    // trophies.wrecking,
  ],
  unlocksLevels: [objectives1],
};

export default hubObjectives;
