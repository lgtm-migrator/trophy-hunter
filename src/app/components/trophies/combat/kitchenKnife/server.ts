import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/overwolf';

const kitchenKnife: TrophyServer = {
  ...base,
  checkProgress: ({ participant, match }) => {
    const requiredDamage = match.queueId === ARAM_HOWLING_ABYSS ? 35000 : 30000;
    return participant.stats.totalDamageDealtToChampions / requiredDamage;
  },
};

export default kitchenKnife;
