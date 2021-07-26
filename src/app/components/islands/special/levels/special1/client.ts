import { LevelClient } from '../../../../levels/types';
import base from './base';
import { SpecialIcon, SpecialMarker } from '../../../../levels/special';
import trophies from '../../../../trophies/client';

const special1: LevelClient = {
  ...base,
  Icon: SpecialIcon,
  Marker: SpecialMarker,
  trophies: [
    trophies.adventurer,
    trophies.popular,
    trophies.forTheVoid,
    trophies.unchanged,
    trophies.privateFirstClass,
  ],
};

export default special1;
