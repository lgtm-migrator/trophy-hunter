import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const greenhorn: TrophyServer = {
  ...base,
  checkProgress: ({ account }) => {
    const trophyProgress = getTrophyProgress(account, 'greenhorn');
    return 1 / 10 + trophyProgress;
  },
};

export default greenhorn;
