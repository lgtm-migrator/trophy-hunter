import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import epic2 from '../epic2/server';

const epic1: LevelServer = {
  ...base,
  trophies: [
    trophies.firstBloodKing,
    trophies.mafiaBoss,
    trophies.pentaKill,
    trophies.pesticide,
    trophies.phoenixStance,
    trophies.purifyer,
    trophies.rageblade,
    trophies.revenantOfTheKaiser,
    trophies.sandsOfTime,
    trophies.theBear,
  ],
  unlocksLevels: [epic2],
};

export default epic1;
