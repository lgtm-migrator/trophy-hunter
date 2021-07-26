import { LevelClient } from '../../../../levels/types';
import base from './base';
import { CombatIcon, CombatMarker } from '../../../../levels/combat';
import trophies from '../../../../trophies/client';

const combat3: LevelClient = {
  ...base,
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [
    trophies.dwarfKing,
    trophies.overload,
    trophies.revenge,
    trophies.soulHarvest,
    trophies.towerdive,
    trophies.trinityForce,
    trophies.vengeance,
    trophies.clothArmor,
    trophies.uncounterable,
  ],
};

export default combat3;
