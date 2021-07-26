import { TrophyServer } from '../../types';
import base from './base';

const silverBullets: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const others = match.participants.filter(
      (other) => other.participantId !== participant.participantId
    );
    const maxTotalDamageDealtToChampions = Math.max(
      ...others.map((other) => other.stats.totalDamageDealtToChampions)
    );

    return Number(
      participant.stats.physicalDamageDealtToChampions >=
        maxTotalDamageDealtToChampions
    );
  },
};

export default silverBullets;
