import { LevelClient } from '../../../../levels/types';
import base from './base';
import { TeamworkIcon, TeamworkMarker } from '../../../../levels/teamwork';
import trophies from '../../../../trophies/client';

const teamwork1: LevelClient = {
  ...base,
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [
    trophies.octopus,
    trophies.teamEffort,
    trophies.teamPlayer,
    trophies.theGriffin,
    trophies.tripleAssist,
    trophies.locusts,
  ],
};

export default teamwork1;
