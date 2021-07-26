import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import special4 from '../special4/server';

const special3: LevelServer = {
  ...base,
  trophies: [
    trophies.wisdom,
    trophies.master,
    trophies.famous,
    trophies.sergeant,
  ],
  unlocksLevels: [special4],
};

export default special3;
