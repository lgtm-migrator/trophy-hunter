import { TrophyClient } from '../../types';
import base from './base';

const trophyHunter: TrophyClient = {
  ...base,
  checkLive: ({ events, account }) => {
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

    return championKills.length / 5;
  },
};

export default trophyHunter;
