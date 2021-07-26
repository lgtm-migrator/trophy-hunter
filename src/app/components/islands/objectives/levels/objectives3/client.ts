import { LevelClient } from '../../../../levels/types';
import base from './base';
import {
  ObjectivesIcon,
  ObjectivesMarker,
} from '../../../../levels/objectives';
import trophies from '../../../../trophies/client';

const objectives3: LevelClient = {
  ...base,
  Icon: ObjectivesIcon,
  Marker: ObjectivesMarker,
  trophies: [
    trophies.deepSea,
    trophies.demolitionPear,
    trophies.theCannon,
    trophies.theDragonMaster,
  ],
};

export default objectives3;
