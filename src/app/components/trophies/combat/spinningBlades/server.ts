import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const spinningBlades: TrophyServer = {
  ...base,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'spinningBlades');

    const damage =
      participant.stats.perk0 === 8005 ? participant.stats.perk0Var1 : 0;

    return damage / 2500 + trophyProgress;
  },
};

export default spinningBlades;
