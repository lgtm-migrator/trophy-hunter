import { TrophyServer } from '../../types';
import base from './base';
import { calcLevel } from '../../../../lib/riot/helpers';

const sheepHunter: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const sheepKills = events.filter((event) => {
      if (
        event.type !== 'CHAMPION_KILL' ||
        event.killerId !== participant.participantId
      ) {
        return false;
      }
      const killerLevel = calcLevel(events, event.killerId, event.timestamp);
      const victimLevel = calcLevel(events, event.victimId, event.timestamp);
      const levelDiff = killerLevel - victimLevel;

      return levelDiff >= 2;
    }).length;

    return sheepKills / 5;
  },
};

export default sheepHunter;
