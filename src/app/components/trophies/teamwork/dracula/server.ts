import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress, findPerk } from '../../../../lib/accounts/helpers';

const dracula: TrophyServer = {
  ...base,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'dracula');

    const tasteOfBlood = findPerk(participant, 8139).var1;
    return tasteOfBlood / 2000 + trophyProgress;
  },
};

export default dracula;
