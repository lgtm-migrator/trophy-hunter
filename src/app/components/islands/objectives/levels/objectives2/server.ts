import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import objectives3 from '../objectives3/server';

const objectives2: LevelServer = {
  ...base,
  trophies: [
    trophies.earlyBird,
    trophies.explosiveCharge,
    trophies.dragonLord,
    trophies.skullMedal,
    trophies.theSacrifice,
  ],
  unlocksLevels: [objectives3],
};

export default objectives2;
