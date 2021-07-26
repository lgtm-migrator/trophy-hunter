import { TrophyServer } from '../../types';
import base from './base';

const superiorPosition: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    const damageDealtToTakenRatio =
      participant.stats.totalDamageDealtToChampions /
      Math.max(1, participant.stats.totalDamageTaken);
    return damageDealtToTakenRatio / 1.34;
  },
};

export default superiorPosition;
