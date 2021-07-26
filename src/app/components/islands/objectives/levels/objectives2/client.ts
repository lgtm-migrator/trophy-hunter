import { LevelClient } from '../../../../levels/types';
import base from './base';
import {
  ObjectivesIcon,
  ObjectivesMarker,
} from '../../../../levels/objectives';
import trophies from '../../../../trophies/client';

const objectives2: LevelClient = {
  ...base,
  Icon: ObjectivesIcon,
  Marker: ObjectivesMarker,
  trophies: [
    trophies.earlyBird,
    trophies.explosiveCharge,
    trophies.dragonLord,
    trophies.skullMedal,
    trophies.theSacrifice,
  ],
};

export default objectives2;
