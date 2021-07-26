import { LevelClient } from '../../../../levels/types';
import base from './base';
import { CombatIcon, CombatMarker } from '../../../../levels/combat';
import trophies from '../../../../trophies/client';

const hubCombat: LevelClient = {
  ...base,
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [trophies.enrage, trophies.kitchenKnife, trophies.trophyHunter],
};

export default hubCombat;
