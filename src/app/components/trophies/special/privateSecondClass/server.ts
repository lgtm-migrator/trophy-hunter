import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const privateSecondClass: TrophyServer = {
  ...base,
  checkProgress: ({ account, missionTrophiesCompleted }) => {
    const trophyProgress = getTrophyProgress(account, 'privateSecondClass');
    return missionTrophiesCompleted / 2 + trophyProgress;
  },
};

export default privateSecondClass;
