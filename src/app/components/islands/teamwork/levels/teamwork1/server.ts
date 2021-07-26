import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import teamwork2 from '../teamwork2/server';

const teamwork1: LevelServer = {
  ...base,
  trophies: [
    trophies.octopus,
    trophies.teamEffort,
    trophies.teamPlayer,
    trophies.theGriffin,
    trophies.tripleAssist,
    trophies.locusts,
  ],
  unlocksLevels: [teamwork2],
};

export default teamwork1;
