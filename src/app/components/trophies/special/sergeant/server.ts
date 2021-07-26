import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const sergeant: TrophyServer = {
  ...base,
  checkProgress: ({ account, missionTrophiesCompleted }) => {
    const trophyProgress = getTrophyProgress(account, 'sergeant');
    return missionTrophiesCompleted / 10 + trophyProgress;
  },
};

export default sergeant;
