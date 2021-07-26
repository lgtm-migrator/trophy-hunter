import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import skills3 from '../skills3/server';

const skills2: LevelServer = {
  ...base,
  trophies: [
    trophies.goliath,
    trophies.maniac,
    trophies.myJungle,
    trophies.noxianKnight,
    trophies.precision,
    trophies.rivalry,
    trophies.unstoppable,
  ],
  unlocksLevels: [skills3],
};

export default skills2;
