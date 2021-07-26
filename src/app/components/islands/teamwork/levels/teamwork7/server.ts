import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import teamwork8 from '../teamwork8/server';

const teamwork7: LevelServer = {
  ...base,
  trophies: [
    trophies.healer,
    trophies.immortal,
    trophies.jungleOfTraps,
    trophies.nurturing,
    trophies.omnipresent,
    trophies.pentaAssist,
    trophies.theKnight,
  ],
  unlocksLevels: [teamwork8],
};

export default teamwork7;
