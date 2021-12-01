import { LevelClient } from '../../../../levels/types';
import base from './base';
import {
  ObjectivesIcon,
  ObjectivesMarker,
} from '../../../../levels/objectives';
import trophies from '../../../../trophies/client';

const hubObjectives: LevelClient = {
  ...base,
  Icon: ObjectivesIcon,
  Marker: ObjectivesMarker,
  trophies: [
    trophies.siegeRam,
    trophies.theViking,
    trophies.dragonHunter,
    trophies.shelly,
    // trophies.wrecking,
  ],
};

export default hubObjectives;
