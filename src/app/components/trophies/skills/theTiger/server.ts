import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const theTiger: TrophyServer = {
  ...base,
  checkProgress: ({ match, account, participant }) => {
    const maxKills = Math.max(
      ...match.participants.map((participant) => participant.stats.kills)
    );
    const mostKills = participant.stats.kills >= maxKills;
    if (!mostKills) {
      return 0;
    }

    const trophyProgress = getTrophyProgress(account, 'theTiger');
    return Number(mostKills) / 3 + trophyProgress;
  },
};

export default theTiger;
