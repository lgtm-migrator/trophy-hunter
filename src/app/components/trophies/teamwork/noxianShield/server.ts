import { TrophyServer } from '../../types';
import base from './base';
import { getTeammates } from '../../../../lib/riot/helpers';

const noxianShield: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const teammates = getTeammates(match, participant);
    const minTeamDeaths = Math.min(
      ...teammates.map((participant) => participant.stats.deaths)
    );

    const maxTeamDamageTanked = Math.max(
      ...teammates.map(
        (participant) =>
          participant.stats.totalDamageTaken +
          participant.stats.damageSelfMitigated
      )
    );

    const hasLeastDeaths = participant.stats.deaths <= minTeamDeaths;
    const hasMostTankedDamage =
      participant.stats.totalDamageTaken +
        participant.stats.damageSelfMitigated >=
      maxTeamDamageTanked;
    return Number(hasLeastDeaths && hasMostTankedDamage);
  },
};

export default noxianShield;
