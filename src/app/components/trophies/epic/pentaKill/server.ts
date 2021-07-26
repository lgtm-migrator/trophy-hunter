import { TrophyServer } from '../../types';
import base from './base';

const pentaKill: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return participant.stats.pentaKills;
  },
};

export default pentaKill;
