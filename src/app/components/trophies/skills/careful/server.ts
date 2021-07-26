import { TrophyServer } from '../../types';
import base from './base';

const careful: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const lessDeathsParticipants = match.participants.filter(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId &&
        otherParticipant.stats.deaths < participant.stats.deaths
    ).length;

    return (9 - lessDeathsParticipants) / 9;
  },
};

export default careful;
