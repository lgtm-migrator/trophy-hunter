import { TrophyServer } from '../../types';
import base from './base';

const quadraKill: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return participant.stats.quadraKills;
  },
};

export default quadraKill;
