import { TrophyServer } from '../../types';
import base from './base';

const unstoppable: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return participant.stats.largestKillingSpree / 5;
  },
};

export default unstoppable;
