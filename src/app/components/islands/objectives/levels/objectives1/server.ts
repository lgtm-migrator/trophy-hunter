import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import objectives2 from '../objectives2/server';

const objectives1: LevelServer = {
  ...base,
  trophies: [
    trophies.baronNashor,
    trophies.dragonSlayer,
    trophies.energized,
    trophies.neutralizer,
    // trophies.smashing,
  ],
  unlocksLevels: [objectives2],
};

export default objectives1;
