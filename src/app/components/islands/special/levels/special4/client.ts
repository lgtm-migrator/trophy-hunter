import { LevelClient } from '../../../../levels/types';
import base from './base';
import { SpecialIcon, SpecialMarker } from '../../../../levels/special';
import trophies from '../../../../trophies/client';

const special4: LevelClient = {
  ...base,
  Icon: SpecialIcon,
  Marker: SpecialMarker,
  trophies: [
    trophies.ancient,
    trophies.oneTrickPony,
    trophies.celebrity,
    trophies.major,
  ],
};

export default special4;
