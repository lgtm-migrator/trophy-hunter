import { getParticipantSoloKills } from '../../../../lib/riot/helpers';
import { TrophyServer } from '../../types';
import base from './base';

const assassinsCreed: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const soloKills = getParticipantSoloKills(
      events,
      participant.participantId
    ).length;
    return soloKills / 7;
  },
};

export default assassinsCreed;
