import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const thePiranha: TrophyServer = {
  ...base,
  checkProgress: ({ match, account, participant }) => {
    const maxDamage = Math.max(
      ...match.participants.map(
        (participant) => participant.stats.totalDamageDealtToChampions
      )
    );

    const mostDamage =
      participant.stats.totalDamageDealtToChampions === maxDamage;

    if (!mostDamage) {
      return 0;
    }
    const trophyProgress = getTrophyProgress(account, 'thePiranha');
    return Number(mostDamage) / 3 + trophyProgress;
  },
};

export default thePiranha;
