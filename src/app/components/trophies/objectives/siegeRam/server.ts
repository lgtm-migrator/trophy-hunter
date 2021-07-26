import { TrophyServer } from '../../types';
import base from './base';

const siegeRam: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const otherTeamParticipants = match.participants.filter(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId &&
        otherParticipant.teamId === participant.teamId
    );
    const maxDamageDealtToTurrets = Math.max(
      ...otherTeamParticipants.map(
        (teamParticipant) => teamParticipant.stats.damageDealtToTurrets
      )
    );

    return participant.stats.damageDealtToTurrets > 0
      ? participant.stats.damageDealtToTurrets / maxDamageDealtToTurrets
      : 0;
  },
};

export default siegeRam;
