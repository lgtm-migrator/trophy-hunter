import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';
import { TrophyServer } from '../../types';
import base from './base';

const fertilizer: TrophyServer = {
  ...base,
  checkProgress: ({ events, match }) => {
    const limit =
      match.info.queueId === ARAM_HOWLING_ABYSS ? 12 * 60000 : 15 * 60000;
    const level10InTime = events.some(
      (event) =>
        event.type === 'LEVEL_UP' &&
        event.level === 10 &&
        event.timestamp <= limit
    );
    return Number(level10InTime);
  },
};

export default fertilizer;
