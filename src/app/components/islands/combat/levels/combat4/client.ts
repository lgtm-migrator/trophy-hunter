import { LevelClient } from '../../../../levels/types';
import base from './base';
import { CombatIcon, CombatMarker } from '../../../../levels/combat';
import trophies from '../../../../trophies/client';

const combat4: LevelClient = {
  ...base,
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [
    trophies.blitzkrieg,
    trophies.cursedGrounds,
    trophies.shockwave,
    trophies.silverBullets,
    trophies.snowball,
    trophies.unleashThePower,
    trophies.wizard,
    trophies.explosive,
    trophies.fullHouse,
    trophies.tripleKill,
  ],
};

export default combat4;
