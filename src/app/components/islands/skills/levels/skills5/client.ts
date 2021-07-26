import { LevelClient } from '../../../../levels/types';
import base from './base';
import { SkillsIcon, SkillsMarker } from '../../../../levels/skills';
import trophies from '../../../../trophies/client';

const skills5: LevelClient = {
  ...base,
  Icon: SkillsIcon,
  Marker: SkillsMarker,
  trophies: [
    trophies.appetizer,
    trophies.carryMode,
    trophies.flameBreath,
    trophies.glutton,
    trophies.theCougar,
  ],
};

export default skills5;
