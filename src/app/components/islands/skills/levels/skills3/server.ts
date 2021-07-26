import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import skills4 from '../skills4/server';

const skills3: LevelServer = {
  ...base,
  trophies: [
    trophies.billGates,
    trophies.dominatingDamage,
    trophies.flameHorizon,
    trophies.godlike,
    trophies.hardHitter,
    trophies.intruder,
    trophies.landlord,
  ],
  unlocksLevels: [skills4],
};

export default skills3;
