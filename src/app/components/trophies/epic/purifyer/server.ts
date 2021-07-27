import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const purifyer: TrophyServer = {
  ...base,
  checkProgress: ({ participant, match }) => {
    const requiredKills = match.queueId === ARAM_HOWLING_ABYSS ? 32 : 30;
    return participant.stats.kills / requiredKills;
  },
};

export default purifyer;
