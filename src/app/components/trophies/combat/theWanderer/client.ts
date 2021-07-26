import { TrophyClient } from '../../types';
import base from './base';

const theWanderer: TrophyClient = {
  ...base,
  checkLive: ({ events, account }) => {
    const killsBefore15 = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        (event.KillerName === account.summoner.name ||
          event.Assisters.includes(account.summoner.name)) &&
        event.EventTime < 15 * 60
    );
    const victimNames = killsBefore15.map((event) => event.VictimName);

    const uniqueVictims = victimNames.filter(
      (victimName, index, current) => current.indexOf(victimName) === index
    ).length;
    return uniqueVictims / 5;
  },
};

export default theWanderer;
