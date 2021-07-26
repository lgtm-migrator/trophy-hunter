import { TrophyServer } from '../../types';
import base from './base';

const explosive: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    const progress =
      Number(participant.stats.largestKillingSpree >= 5) +
      Number(participant.stats.largestMultiKill >= 3) +
      Number(participant.stats.largestCriticalStrike >= 800);

    return progress / 3;
  },
};

export default explosive;
