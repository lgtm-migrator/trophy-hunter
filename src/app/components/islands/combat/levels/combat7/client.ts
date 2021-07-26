import { LevelClient } from '../../../../levels/types';
import base from './base';
import { CombatIcon, CombatMarker } from '../../../../levels/combat';
import trophies from '../../../../trophies/client';

const combat7: LevelClient = {
  ...base,
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [
    trophies.curse,
    trophies.darkBinding,
    trophies.dominus,
    trophies.theWanderer,
    trophies.trophyHunterKing,
  ],
};

export default combat7;
