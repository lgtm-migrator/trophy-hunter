import { TrophyServer } from '../../types';
import base from './base';

const pesticide: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return (
      (participant.stats.totalMinionsKilled +
        participant.stats.neutralMinionsKilled) /
      380
    );
  },
};

export default pesticide;
