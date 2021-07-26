import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import { special1 } from '../../../special/levels/server';

const hubSpecial: LevelServer = {
  ...base,
  trophies: [
    trophies.greenhorn,
    trophies.friendly,
    trophies.diversity,
    trophies.privateSecondClass,
  ],
  unlocksLevels: [special1],
};

export default hubSpecial;
