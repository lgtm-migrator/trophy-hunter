import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import teamwork7 from '../teamwork7/server';

const teamwork6: LevelServer = {
  ...base,
  trophies: [
    trophies.annihilation,
    trophies.bigBrother,
    trophies.guardianAngel,
    trophies.invade,
    trophies.lastResort,
    trophies.ninjas,
    trophies.plague,
  ],
  unlocksLevels: [teamwork7],
};

export default teamwork6;
