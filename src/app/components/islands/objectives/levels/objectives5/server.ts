import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';

const objectives5: LevelServer = {
  ...base,
  trophies: [
    trophies.siegeMaster,
    trophies.theGrandChallenge,
    trophies.theSphinx,
    trophies.tornado,
    trophies.unlockTheBeast,
  ],
  unlocksLevels: [],
};

export default objectives5;
