import { LevelClient } from '../../../../levels/types';
import base from './base';
import { CombatIcon, CombatMarker } from '../../../../levels/combat';
import trophies from '../../../../trophies/client';

const combat2: LevelClient = {
  ...base,
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [
    trophies.bombardment,
    trophies.burningComet,
    trophies.david,
    trophies.deadlyVenom,
    trophies.deathMarks,
    trophies.duelist,
    trophies.sheepHunter,
    trophies.smartness,
    trophies.spinningBlades,
  ],
};

export default combat2;
