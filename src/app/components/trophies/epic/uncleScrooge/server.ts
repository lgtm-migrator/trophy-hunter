import { TrophyServer } from '../../types';
import base from './base';

const uncleScrooge: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return participant.stats.goldEarned / 28000;
  },
};

export default uncleScrooge;
