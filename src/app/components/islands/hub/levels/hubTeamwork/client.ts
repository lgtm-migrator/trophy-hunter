import { LevelClient } from '../../../../levels/types';
import base from './base';
import { TeamworkIcon, TeamworkMarker } from '../../../../levels/teamwork';
import trophies from '../../../../trophies/client';

const hubTeamwork: LevelClient = {
  ...base,
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [trophies.comradeInArms, trophies.feedThem, trophies.theElephant],
};

export default hubTeamwork;
