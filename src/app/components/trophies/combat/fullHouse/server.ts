import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const fullHouse: TrophyServer = {
  ...base,
  checkProgress: ({ participant, match }) => {
    let progress = Math.min(1, participant.stats.tripleKills);
    if (match.queueId === ARAM_HOWLING_ABYSS) {
      progress += Math.min(1, participant.stats.doubleKills / 3);
    } else {
      progress += Math.min(1, participant.stats.doubleKills);
    }
    return progress / 2;
  },
};

export default fullHouse;
