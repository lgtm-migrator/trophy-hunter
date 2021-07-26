import { LevelClient } from '../../../../levels/types';
import base from './base';
import { SpecialIcon, SpecialMarker } from '../../../../levels/special';
import trophies from '../../../../trophies/client';

const special2: LevelClient = {
  ...base,
  Icon: SpecialIcon,
  Marker: SpecialMarker,
  trophies: [
    trophies.experienced,
    trophies.prominent,
    trophies.valentines,
    trophies.specialist,
  ],
};

export default special2;
