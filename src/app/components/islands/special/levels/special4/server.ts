import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';

const special4: LevelServer = {
  ...base,
  trophies: [
    trophies.ancient,
    trophies.oneTrickPony,
    trophies.celebrity,
    trophies.major,
  ],
  unlocksLevels: [],
};

export default special4;
