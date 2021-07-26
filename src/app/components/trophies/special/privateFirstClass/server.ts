import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const privateFirstClass: TrophyServer = {
  ...base,
  checkProgress: ({ account, missionTrophiesCompleted }) => {
    const trophyProgress = getTrophyProgress(account, 'privateFirstClass');
    return missionTrophiesCompleted / 3 + trophyProgress;
  },
};

export default privateFirstClass;
