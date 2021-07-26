import { TrophyClient } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const enrage: TrophyClient = {
  ...base,
  checkLive: ({ events, trophyData, account }) => {
    if (trophyData.enrage || events.length === 0) {
      return 0;
    }

    const multiKills = events.filter(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name &&
        event.KillStreak === 3
    );
    const trophyProgress = getTrophyProgress(account, 'enrage');

    const progress = Math.min(1, multiKills.length / 3 + trophyProgress);
    if (progress === 1) {
      trophyData.enrage = true;
    }
    return progress;
  },
};

export default enrage;
