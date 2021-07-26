import { LevelClient } from '../../../../levels/types';
import base from './base';
import { SkillsIcon, SkillsMarker } from '../../../../levels/skills';
import trophies from '../../../../trophies/client';

const skills2: LevelClient = {
  ...base,
  Icon: SkillsIcon,
  Marker: SkillsMarker,
  trophies: [
    trophies.goliath,
    trophies.maniac,
    trophies.myJungle,
    trophies.noxianKnight,
    trophies.precision,
    trophies.rivalry,
    trophies.unstoppable,
  ],
};

export default skills2;
