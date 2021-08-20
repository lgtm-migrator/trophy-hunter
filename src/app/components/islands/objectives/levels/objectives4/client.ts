import { LevelClient } from '../../../../levels/types';
import base from './base';
import {
  ObjectivesIcon,
  ObjectivesMarker,
} from '../../../../levels/objectives';
import trophies from '../../../../trophies/client';

const objectives4: LevelClient = {
  ...base,
  Icon: ObjectivesIcon,
  Marker: ObjectivesMarker,
  trophies: [
    trophies.noxianWarfare,
    trophies.omnismash,
    trophies.pyromania,
    trophies.sigurd,
    trophies.stomp,
  ],
};

export default objectives4;
