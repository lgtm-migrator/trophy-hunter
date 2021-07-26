import { TrophyClient } from '../../types';
import base from './base';

const doubleKill: TrophyClient = {
  ...base,
  checkLive: ({ events, trophyData, account }) => {
    if (!events.length || trophyData.doubleKill) {
      return 0;
    }

    const doubleKill = events.find(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name &&
        event.KillStreak === 2
    );

    if (doubleKill) {
      trophyData.doubleKill = true;
    }

    return Number(doubleKill);
  },
};

export default doubleKill;
