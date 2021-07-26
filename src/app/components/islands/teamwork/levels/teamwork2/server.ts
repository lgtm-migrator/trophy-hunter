import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import teamwork3 from '../teamwork3/server';

const teamwork2: LevelServer = {
  ...base,
  trophies: [
    trophies.battery,
    trophies.bloodBrothers,
    trophies.chaliceOfRecovery,
    trophies.controller,
    trophies.dracula,
  ],
  unlocksLevels: [teamwork3],
};

export default teamwork2;
