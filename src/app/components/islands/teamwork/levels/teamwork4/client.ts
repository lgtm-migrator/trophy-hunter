import { LevelClient } from '../../../../levels/types';
import base from './base';
import { TeamworkIcon, TeamworkMarker } from '../../../../levels/teamwork';
import trophies from '../../../../trophies/client';

const teamwork4: LevelClient = {
  ...base,
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [
    trophies.quackery,
    trophies.quadraAssist,
    trophies.radar,
    trophies.rejuvenation,
    trophies.sasquatch,
    trophies.theBull,
    trophies.theCompanion,
  ],
};

export default teamwork4;
