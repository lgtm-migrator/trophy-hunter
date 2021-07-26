import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress, findPerk } from '../../../../lib/accounts/helpers';

const rejuvenation: TrophyServer = {
  ...base,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'rejuvenation');

    const tasteOfBlood = findPerk(participant, 8021).var1;
    return tasteOfBlood / 4000 + trophyProgress;
  },
};

export default rejuvenation;
