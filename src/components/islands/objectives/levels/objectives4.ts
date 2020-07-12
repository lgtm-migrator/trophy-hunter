import { Level } from '../../../levels/types';
import { ObjectivesIcon, ObjectivesMarker } from '../../../levels/objectives';
import objectives5 from './objectives5';
import { noxianWarfare, pyromania } from '../../../trophies';

const objectives4: Level = {
  island: 'objectives',
  name: 'objectives4',
  title: 'Objectives island Lvl. 4',
  Icon: ObjectivesIcon,
  Marker: ObjectivesMarker,
  trophies: [noxianWarfare, pyromania],
  unlocksLevels: [objectives5],
};

export default objectives4;
