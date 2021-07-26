import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import { teamwork1 } from '../../../teamwork/levels/server';

const hubTeamwork: LevelServer = {
  ...base,
  trophies: [trophies.comradeInArms, trophies.feedThem, trophies.theElephant],
  unlocksLevels: [teamwork1],
};

export default hubTeamwork;
