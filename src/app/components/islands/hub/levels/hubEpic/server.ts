import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import { epic1 } from '../../../epic/levels/server';

const hubEpic: LevelServer = {
  ...base,
  trophies: [trophies.darkness, trophies.sweetHoney, trophies.neverGiveUp],
  unlocksLevels: [epic1],
};

export default hubEpic;
