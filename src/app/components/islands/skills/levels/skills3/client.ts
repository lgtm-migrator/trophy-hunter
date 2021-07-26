import { LevelClient } from '../../../../levels/types';
import base from './base';
import { SkillsIcon, SkillsMarker } from '../../../../levels/skills';
import trophies from '../../../../trophies/client';

const skills3: LevelClient = {
  ...base,
  Icon: SkillsIcon,
  Marker: SkillsMarker,
  trophies: [
    trophies.billGates,
    trophies.dominatingDamage,
    trophies.flameHorizon,
    trophies.godlike,
    trophies.hardHitter,
    trophies.intruder,
    trophies.landlord,
  ],
};

export default skills3;
