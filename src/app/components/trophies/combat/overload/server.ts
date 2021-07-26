import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const overload: TrophyServer = {
  ...base,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'overload');

    const damage =
      participant.stats.perk0 === 8112 ? participant.stats.perk0Var1 : 0;

    return damage / 2500 + trophyProgress;
  },
};

export default overload;
