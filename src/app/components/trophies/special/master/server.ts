import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const master: TrophyServer = {
  ...base,
  checkProgress: ({ account }) => {
    const trophyProgress = getTrophyProgress(account, 'master');
    return 1 / 200 + trophyProgress;
  },
};

export default master;
