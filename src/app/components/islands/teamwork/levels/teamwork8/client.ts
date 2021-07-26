import { LevelClient } from '../../../../levels/types';
import base from './base';
import { TeamworkIcon, TeamworkMarker } from '../../../../levels/teamwork';
import trophies from '../../../../trophies/client';

const teamwork8: LevelClient = {
  ...base,
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [
    trophies.preserver,
    trophies.rockSolid,
    trophies.rockSurfing,
    trophies.theHound,
    trophies.theRoam,
    trophies.thorsHammer,
    trophies.visionGame,
  ],
};

export default teamwork8;
