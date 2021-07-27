import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const theTortoise: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const requiredTimelimit =
      match.queueId === ARAM_HOWLING_ABYSS ? 1200 : 1800;
    if (
      !participant.stats.longestTimeSpentLiving &&
      match.gameDuration >= requiredTimelimit
    ) {
      return 1;
    }

    return participant.stats.longestTimeSpentLiving / requiredTimelimit;
  },
};

export default theTortoise;
