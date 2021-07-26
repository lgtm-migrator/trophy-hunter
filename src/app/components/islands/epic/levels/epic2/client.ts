import { LevelClient } from '../../../../levels/types';
import base from './base';
import { EpicIcon, EpicMarker } from '../../../../levels/epic';
import trophies from '../../../../trophies/client';

const epic1: LevelClient = {
  ...base,
  Icon: EpicIcon,
  Marker: EpicMarker,
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
};

export default epic1;
