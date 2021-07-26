import { TrophyServer } from '../../types';
import base from './base';

const preserver: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const opponentTeam = match.participants.filter(
      (other) => other.teamId !== participant.teamId
    );

    const maxTotalDamageDealtToChampions = Math.max(
      ...opponentTeam.map((participant) => participant.stats.totalHeal)
    );

    return Number(
      participant.stats.totalHeal >= maxTotalDamageDealtToChampions
    );
  },
};

export default preserver;
