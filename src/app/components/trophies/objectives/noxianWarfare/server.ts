import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const noxianWarfare: TrophyServer = {
  ...base,
  checkProgress: ({ match, account, participant }) => {
    const mostDestructs =
      participant.stats.inhibitorKills + participant.stats.turretKills >=
      Math.max(
        ...match.participants.map(
          (other) => other.stats.inhibitorKills + other.stats.turretKills
        )
      );

    if (!mostDestructs) {
      return 0;
    }
    const trophyProgress = getTrophyProgress(account, 'noxianWarfare');
    return Number(mostDestructs) / 3 + trophyProgress;
  },
};

export default noxianWarfare;
