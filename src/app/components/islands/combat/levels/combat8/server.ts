import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';

const combat8: LevelServer = {
  ...base,
  trophies: [
    trophies.sniper,
    trophies.gloriousEvolution,
    trophies.giantsBelt,
    trophies.quadraKill,
  ],
  unlocksLevels: [],
};

export default combat8;
