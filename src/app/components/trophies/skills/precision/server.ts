import { TrophyServer } from '../../types';
import base from './base';
import { getMinionsAtMin } from '../../../../lib/riot/helpers';

const precision: TrophyServer = {
  ...base,
  checkProgress: ({ match, account, participant, timeline }) => {
    const opponent = match.participants.find(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId &&
        otherParticipant.timeline.role === participant.timeline.role &&
        otherParticipant.timeline.lane === participant.timeline.lane
    );
    if (!opponent) {
      console.warn(
        `Can not find lane opponent for ${account.summoner.name} as ${participant.timeline.role} ${participant.timeline.lane}`
      );
      return 0;
    }

    const participantMinions = getMinionsAtMin(
      timeline,
      10,
      participant.participantId
    );
    const opponentMinions = getMinionsAtMin(
      timeline,
      10,
      opponent.participantId
    );

    const creepsDiffAt10 = participantMinions - opponentMinions;
    return creepsDiffAt10 / 15;
  },
};

export default precision;
