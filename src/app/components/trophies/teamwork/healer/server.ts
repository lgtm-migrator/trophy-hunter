import { TrophyServer } from '../../types';
import base from './base';

const healer: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return Number(
      participant.stats.totalHeal >= 25000 &&
        participant.stats.totalUnitsHealed >= 5
    );
  },
};

export default healer;
