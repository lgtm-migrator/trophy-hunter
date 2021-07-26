import { TrophyServer } from '../../types';
import base from './base';
import { getParticipantSoloKills } from '../../../../lib/riot/helpers';

const duelist: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const soloKills = getParticipantSoloKills(
      events,
      participant.participantId
    ).length;
    return soloKills / 3;
  },
};

export default duelist;
