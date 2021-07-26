import { TrophyServer } from '../../types';
import base from './base';

const legendary: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return participant.stats.largestKillingSpree / 8;
  },
};

export default legendary;
