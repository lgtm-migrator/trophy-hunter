import { TrophyServer } from '../../types';
import base from './base';

const quackery: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return Number(
      participant.stats.totalHeal >= 15000 &&
        participant.stats.totalUnitsHealed >= 5
    );
  },
};

export default quackery;
