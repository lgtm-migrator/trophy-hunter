import { LevelClient } from '../../../../levels/types';
import base from './base';
import { TeamworkIcon, TeamworkMarker } from '../../../../levels/teamwork';
import trophies from '../../../../trophies/client';

const teamwork5: LevelClient = {
  ...base,
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [
    trophies.theGuard,
    trophies.unbreakableWill,
    trophies.voidAura,
    trophies.watcher,
    trophies.zenithBlade,
  ],
};

export default teamwork5;
