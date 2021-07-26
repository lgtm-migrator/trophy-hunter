import { TrophyServer } from '../../types';
import base from './base';

const goliath: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const otherParticipants = match.participants.filter(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId
    );

    const otherMaxChampLevel = Math.max(
      ...otherParticipants.map((participant) => participant.stats.kills)
    );

    return Number(participant.stats.champLevel > otherMaxChampLevel);
  },
};

export default goliath;
