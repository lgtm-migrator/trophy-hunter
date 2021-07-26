import { TrophyServer } from '../../types';
import base from './base';
import { getTeammates } from '../../../../lib/riot/helpers';

const unbreakableWill: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    if (participant.timeline.role !== 'DUO_SUPPORT') {
      return 0;
    }

    const team = getTeammates(match, participant);
    const maxAssists = Math.max(
      ...team.map((participant) => participant.stats.assists)
    );
    const maxDamageSelfMitigated = Math.max(
      ...team.map((participant) => participant.stats.damageSelfMitigated)
    );

    return Number(
      participant.stats.assists >= maxAssists &&
        participant.stats.damageSelfMitigated >= maxDamageSelfMitigated
    );
  },
};

export default unbreakableWill;
