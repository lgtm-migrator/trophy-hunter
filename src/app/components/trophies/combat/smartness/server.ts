import { TrophyServer } from '../../types';
import base from './base';

const smartness: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    const hasKillingSpree = Number(participant.stats.killingSprees >= 1);
    const hasTenAssists = Number(participant.stats.assists >= 10);
    const hasLessThanFiveDeaths = Number(participant.stats.deaths <= 5);

    return (hasKillingSpree + hasTenAssists + hasLessThanFiveDeaths) / 3;
  },
};

export default smartness;
