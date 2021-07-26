import { TrophyServer } from '../../types';
import base from './base';

const tripleKill: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return Number(participant.stats.tripleKills > 0);
  },
};

export default tripleKill;
