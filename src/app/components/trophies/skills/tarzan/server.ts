import { TrophyServer } from '../../types';
import base from './base';
import { getOtherParticipants } from '../../../../lib/riot/helpers';

const tarzan: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxNeutralMinionsKilled = Math.max(
      ...match.participants.map(
        (participant) => participant.stats.neutralMinionsKilled
      )
    );

    const others = getOtherParticipants(match, participant);
    const otherMaxChampLevel = Math.max(
      ...others.map((other) => other.stats.champLevel)
    );

    return Number(
      participant.stats.neutralMinionsKilled >= maxNeutralMinionsKilled &&
        participant.stats.champLevel > otherMaxChampLevel
    );
  },
};

export default tarzan;
