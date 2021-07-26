import { LevelClient } from '../../../../levels/types';
import base from './base';
import { EpicIcon, EpicMarker } from '../../../../levels/epic';
import trophies from '../../../../trophies/client';

const epic1: LevelClient = {
  ...base,
  Icon: EpicIcon,
  Marker: EpicMarker,
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
};

export default epic1;
