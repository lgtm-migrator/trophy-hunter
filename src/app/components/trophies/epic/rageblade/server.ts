import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const rageblade: TrophyServer = {
  ...base,
  checkProgress: ({ participant, match }) => {
    const requiredDamage = match.queueId === ARAM_HOWLING_ABYSS ? 80000 : 75000;
    return Number(
      participant.stats.totalDamageDealtToChampions >= requiredDamage
    );
  },
};

export default rageblade;
