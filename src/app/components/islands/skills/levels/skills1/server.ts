import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import skills2 from '../skills2/server';

const skills1: LevelServer = {
  ...base,
  trophies: [
    trophies.dominating,
    trophies.damageDealer,
    trophies.hextechLord,
    trophies.killerInstinct,
    trophies.disruptor,
  ],
  unlocksLevels: [skills2],
};

export default skills1;
