import { LevelClient } from '../../../../levels/types';
import base from './base';
import { SpecialIcon, SpecialMarker } from '../../../../levels/special';
import trophies from '../../../../trophies/client';

const special3: LevelClient = {
  ...base,
  Icon: SpecialIcon,
  Marker: SpecialMarker,
  trophies: [
    trophies.wisdom,
    trophies.master,
    trophies.famous,
    trophies.sergeant,
  ],
};

export default special3;
