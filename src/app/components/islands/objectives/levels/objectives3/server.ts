import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import objectives4 from '../objectives4/server';

const objectives3: LevelServer = {
  ...base,
  trophies: [
    trophies.deepSea,
    trophies.demolitionPear,
    trophies.theCannon,
    trophies.theDragonMaster,
  ],
  unlocksLevels: [objectives4],
};

export default objectives3;
