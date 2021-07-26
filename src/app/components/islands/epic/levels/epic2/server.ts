import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';

const epic1: LevelServer = {
  ...base,
  trophies: [
    trophies.theBlackFlag,
    trophies.theCat,
    trophies.theHive,
    trophies.thePhoenix,
    trophies.thePiranha,
    trophies.thePirate,
    trophies.theSheriff,
    trophies.theTortoise,
    trophies.theWhale,
    trophies.thornmail,
    trophies.uncleScrooge,
    trophies.wormMasher,
  ],
  unlocksLevels: [],
};

export default epic1;
