import { TrophyServer } from '../../types';
import base from './base';

const farmer: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return (
      (participant.stats.totalMinionsKilled +
        participant.stats.neutralMinionsKilled) /
      200
    );
  },
};

export default farmer;
