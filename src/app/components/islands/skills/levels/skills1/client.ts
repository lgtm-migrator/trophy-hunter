import { LevelClient } from '../../../../levels/types';
import base from './base';
import { SkillsIcon, SkillsMarker } from '../../../../levels/skills';
import trophies from '../../../../trophies/client';

const skills1: LevelClient = {
  ...base,
  Icon: SkillsIcon,
  Marker: SkillsMarker,
  trophies: [
    trophies.dominating,
    trophies.damageDealer,
    trophies.hextechLord,
    trophies.killerInstinct,
    trophies.disruptor,
  ],
};

export default skills1;
