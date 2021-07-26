import { TrophyServer } from '../../types';
import base from './base';
import { getParticipantDeaths } from '../../../../lib/riot/helpers';

const gloriousEvolution: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant }) => {
    const maxDamage = Math.max(
      ...match.participants.map(
        (participant) => participant.stats.totalDamageDealtToChampions
      )
    );

    const deaths = getParticipantDeaths(events, participant.participantId);
    const gameLongEnough = match.gameDuration > 30 * 60;
    const mostDamage =
      participant.stats.totalDamageDealtToChampions === maxDamage;
    const notDieAfter30Minutes = deaths.every(
      (death) => death.timestamp < match.gameDuration * 1000 - 300000
    );
    return Number(gameLongEnough && mostDamage && notDieAfter30Minutes);
  },
};

export default gloriousEvolution;
