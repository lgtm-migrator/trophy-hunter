import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const ancient: TrophyServer = {
  ...base,
  checkProgress: ({ account }) => {
    const trophyProgress = getTrophyProgress(account, 'ancient');
    return 1 / 500 + trophyProgress;
  },
};

export default ancient;
