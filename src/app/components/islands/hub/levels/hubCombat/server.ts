import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import { combat1 } from '../../../combat/levels/server';

const hubCombat: LevelServer = {
  ...base,
  trophies: [trophies.enrage, trophies.kitchenKnife, trophies.trophyHunter],
  unlocksLevels: [combat1],
};

export default hubCombat;
