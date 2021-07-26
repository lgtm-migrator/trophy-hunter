import { TrophyServer } from '../../types';
import base from './base';

const giantsBelt: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    const damageTankedPerDeath =
      (participant.stats.totalDamageTaken +
        participant.stats.damageSelfMitigated) /
      Math.max(participant.stats.deaths, 1);

    return Number(damageTankedPerDeath >= 20000);
  },
};

export default giantsBelt;
