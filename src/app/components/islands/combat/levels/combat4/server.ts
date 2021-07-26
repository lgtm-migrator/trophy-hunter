import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import combat5 from '../combat5/server';

const combat4: LevelServer = {
  ...base,
  trophies: [
    trophies.blitzkrieg,
    trophies.cursedGrounds,
    trophies.shockwave,
    trophies.silverBullets,
    trophies.snowball,
    trophies.unleashThePower,
    trophies.wizard,
    trophies.explosive,
    trophies.fullHouse,
    trophies.tripleKill,
  ],
  unlocksLevels: [combat5],
};

export default combat4;
