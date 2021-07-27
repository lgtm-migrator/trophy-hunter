import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const stomp: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const requiredDuration = match.queueId === ARAM_HOWLING_ABYSS ? 16 : 22;

    return Number(
      match.gameDuration < requiredDuration * 60 && participant.stats.win
    );
  },
};

export default stomp;
