import { TrophyServer } from '../../types';
import base from './base';

const guardianAngel: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return Number(
      participant.stats.totalHeal >= 15000 &&
        participant.stats.totalUnitsHealed >= 5 &&
        participant.stats.wardsPlaced >= 18 &&
        participant.stats.assists >= 12
    );
  },
};

export default guardianAngel;
