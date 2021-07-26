import { LevelClient } from '../../../../levels/types';
import base from './base';
import { SpecialIcon, SpecialMarker } from '../../../../levels/special';
import trophies from '../../../../trophies/client';

const hubSpecial: LevelClient = {
  ...base,
  Icon: SpecialIcon,
  Marker: SpecialMarker,
  trophies: [
    trophies.greenhorn,
    trophies.friendly,
    trophies.diversity,
    trophies.privateSecondClass,
  ],
};

export default hubSpecial;
