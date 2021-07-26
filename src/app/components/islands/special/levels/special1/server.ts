import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import special2 from '../special2/server';

const special1: LevelServer = {
  ...base,
  trophies: [
    trophies.adventurer,
    trophies.popular,
    trophies.forTheVoid,
    trophies.unchanged,
    trophies.privateFirstClass,
  ],
  unlocksLevels: [special2],
};

export default special1;
