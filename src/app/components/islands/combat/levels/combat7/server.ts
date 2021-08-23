import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import combat8 from '../combat8/server';

const combat7: LevelServer = {
  ...base,
  trophies: [
    trophies.curse,
    trophies.darkBinding,
    trophies.dominus,
    trophies.igniteKill,
    trophies.theWanderer,
    trophies.trophyHunterKing,
  ],
  unlocksLevels: [combat8],
};

export default combat7;
