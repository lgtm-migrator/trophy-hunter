import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress, findPerk } from '../../../../lib/accounts/helpers';

const voidAura: TrophyServer = {
  ...base,
  checkProgress: ({ participant, account }) => {
    const lifeAndDeath = findPerk(participant, 8009);
    const trophyProgress = getTrophyProgress(account, 'voidAura');

    return (lifeAndDeath.var1 + lifeAndDeath.var2) / 2000 + trophyProgress;
  },
};

export default voidAura;
