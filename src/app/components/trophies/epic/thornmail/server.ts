import { TrophyServer } from '../../types';
import base from './base';

const thornmail: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    const damageTankedPerDeath =
      (participant.stats.totalDamageTaken +
        participant.stats.damageSelfMitigated) /
      Math.max(participant.stats.deaths, 1);

    return damageTankedPerDeath / 40000;
  },
};

export default thornmail;
