import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const experienced: TrophyServer = {
  ...base,
  checkProgress: ({ account }) => {
    const trophyProgress = getTrophyProgress(account, 'experienced');
    return 1 / 50 + trophyProgress;
  },
};

export default experienced;
