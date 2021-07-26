import { TrophyServer } from '../../types';
import base from './base';

const landlord: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return (
      (participant.stats.totalMinionsKilled +
        participant.stats.neutralMinionsKilled) /
      300
    );
  },
};

export default landlord;
