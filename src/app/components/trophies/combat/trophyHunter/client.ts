import { TrophyClient } from '../../types';
import base from './base';

const trophyHunter: TrophyClient = {
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

    if (championKills.length <= (trophyData.trophyHunter || 0)) {
      return 0;
    }

    trophyData.trophyHunter = championKills.length;
    return championKills.length / 5;
  },
};

export default trophyHunter;
