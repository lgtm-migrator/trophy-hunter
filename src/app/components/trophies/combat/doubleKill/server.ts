import { TrophyServer } from '../../types';
import base from './base';

const doubleKill: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return participant.stats.doubleKills;
  },
};

export default doubleKill;
