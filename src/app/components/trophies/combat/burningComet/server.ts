import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const burningComet: TrophyServer = {
  ...base,
  checkProgress: ({ account, participant }) => {
    const trophyProgress = getTrophyProgress(account, 'burningComet');
    const damage =
      participant.stats.perk0 === 8229 ? participant.stats.perk0Var1 : 0;

    return damage / 2500 + trophyProgress;
  },
};

export default burningComet;
