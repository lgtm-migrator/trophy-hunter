import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import combat6 from '../combat6/server';

const combat5: LevelServer = {
  ...base,
  trophies: [
    trophies.bloodThirst,
    trophies.livingArtillery,
    trophies.machete,
    trophies.sai,
    trophies.theFinalHour,
    trophies.theZombie,
    trophies.tuorsAxe,
    trophies.superiorBrain,
    trophies.superiorEquipment,
  ],
  unlocksLevels: [combat6],
};

export default combat5;
