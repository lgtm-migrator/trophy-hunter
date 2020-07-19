import { Level } from '../../../levels/types';
import { TeamworkIcon, TeamworkMarker } from '../../../levels/teamwork';
import { preserver, rockSolid, rockSurfing } from '../../../trophies';

const teamwork8: Level = {
  island: 'teamwork',
  name: 'teamwork8',
  title: 'Teamwork island Lvl. 8',
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [preserver, rockSolid, rockSurfing],
  unlocksLevels: [],
};

export default teamwork8;
