import { LevelClient } from '../../../../levels/types';
import base from './base';
import { EpicIcon, EpicMarker } from '../../../../levels/epic';
import trophies from '../../../../trophies/client';

const hubEpic: LevelClient = {
  ...base,
  Icon: EpicIcon,
  Marker: EpicMarker,
  trophies: [trophies.darkness, trophies.sweetHoney, trophies.neverGiveUp],
};

export default hubEpic;
