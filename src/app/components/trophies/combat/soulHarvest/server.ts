import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const soulHarvest: TrophyServer = {
  ...base,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'soulHarvest');

    const damage =
      participant.stats.perk0 === 8128 ? participant.stats.perk0Var1 : 0;

    return damage / 2000 + trophyProgress;
  },
};

export default soulHarvest;
