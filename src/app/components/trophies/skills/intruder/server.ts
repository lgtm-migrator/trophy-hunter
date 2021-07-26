import { TrophyServer } from '../../types';
import base from './base';

const intruder: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return Number(participant.stats.neutralMinionsKilledEnemyJungle >= 25);
  },
};

export default intruder;
