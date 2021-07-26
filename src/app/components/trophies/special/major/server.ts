import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const major: TrophyServer = {
  ...base,
  checkProgress: ({ account, missionTrophiesCompleted }) => {
    const trophyProgress = getTrophyProgress(account, 'major');
    return missionTrophiesCompleted / 20 + trophyProgress;
  },
};

export default major;
