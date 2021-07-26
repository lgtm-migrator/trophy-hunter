import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';

const welcome: LevelServer = {
  ...base,
  trophies: [trophies.playstyle],
  unlocksLevels: [],
};

export default welcome;
