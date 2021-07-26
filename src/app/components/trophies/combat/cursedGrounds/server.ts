import { TrophyServer } from '../../types';
import base from './base';
import { BUFF_POSITIONS } from '../../../../lib/riot/helpers';
import { TEN_MINUTES } from '../../../../lib/utils/dates';

const cursedGrounds: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const validKills = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.timestamp <= TEN_MINUTES &&
        BUFF_POSITIONS.some(([x, y]) => {
          const distanceToBuff = Math.sqrt(
            (event.position.x - x) * (event.position.x - x) +
              (event.position.y - y) * (event.position.y - y)
          );
          return distanceToBuff <= 1250;
        })
    );
    return validKills.length;
  },
};

export default cursedGrounds;
