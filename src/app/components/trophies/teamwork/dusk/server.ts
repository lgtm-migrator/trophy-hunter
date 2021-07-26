import { TrophyServer } from '../../types';
import base from './base';

const dusk: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return participant.stats.wardsKilled / 6;
  },
};

export default dusk;
