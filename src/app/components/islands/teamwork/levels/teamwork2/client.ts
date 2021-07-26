import { LevelClient } from '../../../../levels/types';
import base from './base';
import { TeamworkIcon, TeamworkMarker } from '../../../../levels/teamwork';
import trophies from '../../../../trophies/client';

const teamwork2: LevelClient = {
  ...base,
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [
    trophies.battery,
    trophies.bloodBrothers,
    trophies.chaliceOfRecovery,
    trophies.controller,
    trophies.dracula,
  ],
};

export default teamwork2;
