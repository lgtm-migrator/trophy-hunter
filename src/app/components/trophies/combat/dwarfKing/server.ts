import { TrophyServer } from '../../types';
import base from './base';
import { calcLevel } from '../../../../lib/riot/helpers';

const dwarfKing: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const dwarfKingKills = events.filter((event) => {
      if (
        event.type !== 'CHAMPION_KILL' ||
        event.killerId !== participant.participantId
      ) {
        return false;
      }
      const killerLevel = calcLevel(events, event.killerId, event.timestamp);
      const victimLevel = calcLevel(events, event.victimId, event.timestamp);

      return killerLevel < victimLevel;
    }).length;
    return dwarfKingKills / 5;
  },
};

export default dwarfKing;
