import { TrophyClient } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const trophyHunterKing: TrophyClient = {
  ...base,
  checkLive: ({ events, trophyData, account }) => {
    if (!events.length) {
      return 0;
    }

    const championKills = events.reduce((current, event) => {
      if (
        event.EventName !== 'ChampionKill' ||
        event.KillerName !== account.summoner.name ||
        current.includes(event.VictimName)
      ) {
        return current;
      }
      return [...current, event.VictimName];
    }, []);

    if (championKills.length <= (trophyData.trophyHunterKing || 0)) {
      return 0;
    }

    trophyData.trophyHunterKing = championKills.length;
    const trophyHunt = championKills.length >= 5;
    if (!trophyHunt) {
      return 0;
    }
    const trophyProgress = getTrophyProgress(account, 'trophyHunterKing');
    return Number(trophyHunt) / 3 + trophyProgress;
  },
};

export default trophyHunterKing;
