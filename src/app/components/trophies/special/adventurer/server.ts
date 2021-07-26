import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const adventurer: TrophyServer = {
  ...base,
  checkProgress: ({ account }) => {
    const trophyProgress = getTrophyProgress(account, 'adventurer');
    return 1 / 30 + trophyProgress;
  },
};

export default adventurer;
