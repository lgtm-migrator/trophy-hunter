import { LevelClient } from '../../../../levels/types';
import base from './base';
import { CombatIcon, CombatMarker } from '../../../../levels/combat';
import trophies from '../../../../trophies/client';

const combat1: LevelClient = {
  ...base,
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [
    trophies.doubleKill,
    trophies.firstBlood,
    trophies.flail,
    trophies.igniteAssist,
    trophies.keyTargets,
    trophies.skullHunter,
    trophies.superiorPosition,
  ],
};

export default combat1;
