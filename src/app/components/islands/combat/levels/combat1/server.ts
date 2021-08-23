import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import combat2 from '../combat2/server';

const combat1: LevelServer = {
  ...base,
  trophies: [
    trophies.doubleKill,
    trophies.firstBlood,
    trophies.flail,
    trophies.igniteAssist,
    trophies.keyTargets,
    trophies.skullHunter,
    trophies.superiorPosition,
  ],
  unlocksLevels: [combat2],
};

export default combat1;
