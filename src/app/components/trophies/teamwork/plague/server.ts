import { TrophyServer } from '../../types';
import base from './base';

const plague: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxKillParticipation = Math.max(
      ...match.participants.map(
        (participant) => participant.stats.kills + participant.stats.assists
      )
    );
    const maxTotalHeal = Math.max(
      ...match.participants.map((participant) => participant.stats.totalHeal)
    );

    return Number(
      participant.stats.kills + participant.stats.assists >=
        maxKillParticipation && participant.stats.totalHeal >= maxTotalHeal
    );
  },
};

export default plague;
