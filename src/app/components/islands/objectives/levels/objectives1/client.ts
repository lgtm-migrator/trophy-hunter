import { LevelClient } from '../../../../levels/types';
import base from './base';
import {
  ObjectivesIcon,
  ObjectivesMarker,
} from '../../../../levels/objectives';
import trophies from '../../../../trophies/client';

const objectives1: LevelClient = {
  ...base,
  Icon: ObjectivesIcon,
  Marker: ObjectivesMarker,
  trophies: [
    trophies.baronNashor,
    trophies.dragonSlayer,
    trophies.energized,
    trophies.neutralizer,
    trophies.shellyAndShirley,
    // trophies.smashing,
  ],
};

export default objectives1;
