import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const theWhale: TrophyServer = {
  ...base,
  checkProgress: ({ match, account, participant }) => {
    const mostCS = Math.max(
      ...match.participants.map(
        (participant) =>
          participant.stats.totalMinionsKilled +
          participant.stats.neutralMinionsKilled
      )
    );

    const hasMostCS =
      participant.stats.totalMinionsKilled +
        participant.stats.neutralMinionsKilled >=
      mostCS;
    if (!hasMostCS) {
      return 0;
    }

    const trophyProgress = getTrophyProgress(account, 'theWhale');
    return 1 / 3 + trophyProgress;
  },
};

export default theWhale;
