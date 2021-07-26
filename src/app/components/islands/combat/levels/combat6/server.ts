import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import combat7 from '../combat7/server';

const combat6: LevelServer = {
  ...base,
  trophies: [
    trophies.assassinsCreed,
    trophies.curtainCall,
    trophies.darkinBlade,
    trophies.deadlyShadow,
    trophies.grimReaper,
    trophies.wolfPack,
    trophies.sinisterBlades,
  ],
  unlocksLevels: [combat7],
};

export default combat6;
