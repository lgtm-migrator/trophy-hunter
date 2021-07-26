import { LevelClient } from '../../../../levels/types';
import base from './base';
import { CombatIcon, CombatMarker } from '../../../../levels/combat';
import trophies from '../../../../trophies/client';

const combat6: LevelClient = {
  ...base,
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [
    trophies.assassinsCreed,
    trophies.curtainCall,
    trophies.darkinBlade,
    trophies.deadlyShadow,
    trophies.grimReaper,
    trophies.wolfPack,
    trophies.sinisterBlades,
  ],
};

export default combat6;
