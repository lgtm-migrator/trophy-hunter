import { TrophyServer } from '../../types';
import base from './base';

const deadlyVenom: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const sortedParticipants = match.participants.sort(
      (a, b) =>
        b.stats.totalDamageDealtToChampions -
        a.stats.totalDamageDealtToChampions
    );
    const otherParticipants = sortedParticipants.filter(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId
    );
    const highestDamageParticipant = otherParticipants[0];

    const progress =
      participant.stats.totalDamageDealtToChampions /
      highestDamageParticipant.stats.totalDamageDealtToChampions /
      1.25;

    return progress;
  },
};

export default deadlyVenom;
