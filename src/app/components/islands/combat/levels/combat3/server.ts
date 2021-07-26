import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import combat4 from '../combat4/server';

const combat3: LevelServer = {
  ...base,
  trophies: [
    trophies.dwarfKing,
    trophies.overload,
    trophies.revenge,
    trophies.soulHarvest,
    trophies.towerdive,
    trophies.trinityForce,
    trophies.vengeance,
    trophies.clothArmor,
    trophies.uncounterable,
  ],
  unlocksLevels: [combat4],
};

export default combat3;
