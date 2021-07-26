import { TrophyServer } from '../../types';
import base from './base';
import { findPerk, getTrophyProgress } from '../../../../lib/accounts/helpers';

const lifeAndDeath: TrophyServer = {
  ...base,
  checkProgress: ({ participant, account }) => {
    const lifeAndDeath = findPerk(participant, 8437);
    const trophyProgress = getTrophyProgress(account, 'lifeAndDeath');

    return (lifeAndDeath.var1 + lifeAndDeath.var2) / 2500 + trophyProgress;
  },
};

export default lifeAndDeath;
