import { TrophyServer } from '../../types';
import base from './base';
import {
  getMinionsAtMin,
  getOtherParticipants,
} from '../../../../lib/riot/helpers';

const theBee: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant, timeline }) => {
    const others = getOtherParticipants(match, participant);
    const participantMinionsAt10 = getMinionsAtMin(
      timeline,
      10,
      participant.participantId
    );
    const participantMinionsAt20 = getMinionsAtMin(
      timeline,
      20,
      participant.participantId
    );

    const maxCsTen = Math.max(
      ...others.map((other) =>
        getMinionsAtMin(timeline, 10, other.participantId)
      )
    );
    const maxCsTwenty = Math.max(
      ...others.map((other) =>
        getMinionsAtMin(timeline, 20, other.participantId)
      )
    );
    return Number(
      participantMinionsAt10 >= maxCsTen + 10 &&
        participantMinionsAt20 >= maxCsTwenty + 20
    );
  },
};

export default theBee;
