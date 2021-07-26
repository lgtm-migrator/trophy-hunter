import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import combat3 from '../combat3/server';

const combat2: LevelServer = {
  ...base,
  trophies: [
    trophies.bombardment,
    trophies.burningComet,
    trophies.david,
    trophies.deadlyVenom,
    trophies.deathMarks,
    trophies.duelist,
    trophies.sheepHunter,
    trophies.smartness,
    trophies.spinningBlades,
  ],
  unlocksLevels: [combat3],
};

export default combat2;
