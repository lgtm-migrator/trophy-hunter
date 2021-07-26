import { LevelClient } from '../../../../levels/types';
import base from './base';
import { TeamworkIcon, TeamworkMarker } from '../../../../levels/teamwork';
import trophies from '../../../../trophies/client';

const teamwork6: LevelClient = {
  ...base,
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [
    trophies.annihilation,
    trophies.bigBrother,
    trophies.guardianAngel,
    trophies.invade,
    trophies.lastResort,
    trophies.ninjas,
    trophies.plague,
  ],
};

export default teamwork6;
