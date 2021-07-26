import { LevelClient } from '../../../../levels/types';
import base from './base';
import { HubIcon, HubMarker } from '../../../../levels/hub';
import trophies from '../../../../trophies/client';

const welcome: LevelClient = {
  ...base,
  Icon: HubIcon,
  Marker: HubMarker,
  trophies: [trophies.playstyle],
};

export default welcome;
