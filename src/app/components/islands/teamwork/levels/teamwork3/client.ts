import { LevelClient } from '../../../../levels/types';
import base from './base';
import { TeamworkIcon, TeamworkMarker } from '../../../../levels/teamwork';
import trophies from '../../../../trophies/client';

const teamwork3: LevelClient = {
  ...base,
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [
    trophies.dusk,
    trophies.greyEminence,
    trophies.highSociety,
    trophies.lifeAndDeath,
    trophies.lightBringer,
    trophies.mercenary,
    trophies.noxianArmy,
    trophies.noxianShield,
  ],
};

export default teamwork3;
