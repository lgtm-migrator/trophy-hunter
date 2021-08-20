import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import objectives5 from '../objectives5/server';

const objectives4: LevelServer = {
  ...base,
  trophies: [
    trophies.noxianWarfare,
    trophies.omnismash,
    trophies.pyromania,
    trophies.sigurd,
    trophies.stomp,
  ],
  unlocksLevels: [objectives5],
};

export default objectives4;
