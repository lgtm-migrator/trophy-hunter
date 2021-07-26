import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const specialist: TrophyServer = {
  ...base,
  checkProgress: ({ account, missionTrophiesCompleted }) => {
    const trophyProgress = getTrophyProgress(account, 'specialist');
    return missionTrophiesCompleted / 5 + trophyProgress;
  },
};

export default specialist;
