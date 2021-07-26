import { TrophyServer } from '../../types';
import base from './base';
import { calcLevel } from '../../../../lib/riot/helpers';

const david: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const davidKills = events.filter((event) => {
      if (
        event.type !== 'CHAMPION_KILL' ||
        event.killerId !== participant.participantId
      ) {
        return false;
      }
      const killerLevel = calcLevel(events, event.killerId, event.timestamp);
      const victimLevel = calcLevel(events, event.victimId, event.timestamp);

      return victimLevel >= killerLevel + 2;
    }).length;
    return davidKills;
  },
};

export default david;
