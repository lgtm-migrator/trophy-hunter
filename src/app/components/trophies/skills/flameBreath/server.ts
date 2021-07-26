import { TrophyServer } from '../../types';
import base from './base';

const flameBreath: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    if (participant.timeline.lane !== 'JUNGLE') {
      return 0;
    }

    const others = match.participants.filter(
      (other) => other.participantId !== participant.participantId
    );

    const ownCS =
      participant.stats.totalMinionsKilled +
      participant.stats.neutralMinionsKilled;

    const otherCSMax = Math.max(
      ...others.map(
        (other) =>
          other.stats.totalMinionsKilled + other.stats.neutralMinionsKilled
      )
    );

    return Number(ownCS > otherCSMax);
  },
};

export default flameBreath;
