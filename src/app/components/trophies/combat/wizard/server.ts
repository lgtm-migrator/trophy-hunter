import { TrophyServer } from '../../types';
import base from './base';

const wizard: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const others = match.participants.filter(
      (other) => other.participantId !== participant.participantId
    );
    const maxTotalDamageDealtToChampions = Math.max(
      ...others.map((other) => other.stats.totalDamageDealtToChampions)
    );

    return Number(
      participant.stats.magicDamageDealtToChampions >=
        maxTotalDamageDealtToChampions
    );
  },
};

export default wizard;
