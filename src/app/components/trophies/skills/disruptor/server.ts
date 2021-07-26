import { TrophyServer } from '../../types';
import base from './base';

const disruptor: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxTotalTimeCrowdControlDealt = Math.max(
      ...match.participants.map(
        (participant) => participant.stats.totalTimeCrowdControlDealt
      )
    );

    return Number(
      participant.stats.totalTimeCrowdControlDealt >=
        maxTotalTimeCrowdControlDealt
    );
  },
};

export default disruptor;
