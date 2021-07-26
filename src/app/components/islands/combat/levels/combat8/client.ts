import { LevelClient } from '../../../../levels/types';
import base from './base';
import { CombatIcon, CombatMarker } from '../../../../levels/combat';
import trophies from '../../../../trophies/client';

const combat8: LevelClient = {
  ...base,
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [
    trophies.sniper,
    trophies.gloriousEvolution,
    trophies.giantsBelt,
    trophies.quadraKill,
  ],
};

export default combat8;
