import { TrophyServer } from '../../types';
import base from './base';

const tuorsAxe: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const sortedParticipants = match.participants.sort(
      (participantA, participantB) => {
        return (
          participantB.stats.totalDamageDealtToChampions -
          participantA.stats.totalDamageDealtToChampions
        );
      }
    );
    const mostDamageParticipant = sortedParticipants[0];
    if (participant.participantId !== mostDamageParticipant.participantId) {
      return 0;
    }
    const secondMostDamageParticipant = sortedParticipants[1];

    return (
      (participant.stats.totalDamageDealtToChampions / 1.5) *
      secondMostDamageParticipant.stats.totalDamageDealtToChampions
    );
  },
};

export default tuorsAxe;
