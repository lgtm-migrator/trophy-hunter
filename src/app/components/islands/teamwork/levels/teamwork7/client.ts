import { LevelClient } from '../../../../levels/types';
import base from './base';
import { TeamworkIcon, TeamworkMarker } from '../../../../levels/teamwork';
import trophies from '../../../../trophies/client';

const teamwork7: LevelClient = {
  ...base,
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [
    trophies.healer,
    trophies.immortal,
    trophies.jungleOfTraps,
    trophies.nurturing,
    trophies.omnipresent,
    trophies.pentaAssist,
    trophies.theKnight,
  ],
};

export default teamwork7;
