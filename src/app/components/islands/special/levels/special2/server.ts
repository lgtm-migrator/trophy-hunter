import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import special3 from '../special3/server';

const special2: LevelServer = {
  ...base,
  trophies: [
    trophies.experienced,
    trophies.prominent,
    trophies.valentines,
    trophies.specialist,
  ],
  unlocksLevels: [special3],
};

export default special2;
