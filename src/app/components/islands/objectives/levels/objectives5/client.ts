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
    trophies.siegeMaster,
    trophies.theGrandChallenge,
    trophies.theSphinx,
    trophies.tornado,
    trophies.unlockTheBeast,
  ],
};

export default objectives1;
