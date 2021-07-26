import { LevelClient } from '../../../../levels/types';
import base from './base';
import { CombatIcon, CombatMarker } from '../../../../levels/combat';
import trophies from '../../../../trophies/client';

const combat5: LevelClient = {
  ...base,
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [
    trophies.bloodThirst,
    trophies.livingArtillery,
    trophies.machete,
    trophies.sai,
    trophies.theFinalHour,
    trophies.theZombie,
    trophies.tuorsAxe,
    trophies.superiorBrain,
    trophies.superiorEquipment,
  ],
};

export default combat5;
