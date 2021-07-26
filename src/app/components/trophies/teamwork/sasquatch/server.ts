import { TrophyServer } from '../../types';
import base from './base';
import { getParticipantAssists } from '../../../../lib/riot/helpers';

const sasquatch: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const assistsBefore12 = getParticipantAssists(
      events,
      participant.participantId
    ).filter((event) => event.timestamp < 720000);
    const assists = assistsBefore12.reduce<{ [teammateId: number]: number }>(
      (assists, event) => {
        const teammateId = event.killerId;
        return {
          ...assists,
          [teammateId]: (assists[teammateId] || 0) + 1,
        };
      },
      {}
    );
    return Object.keys(assists).length / 3;
  },
};

export default sasquatch;
