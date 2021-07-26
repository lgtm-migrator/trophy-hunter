import { TrophyClient } from '../../types';
import base from './base';

const smartness: TrophyClient = {
  ...base,
  checkLive: ({ events, account }) => {
    const deaths = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.VictimName === account.summoner.name
    ).length;
    if (deaths > 5) {
      return 0;
    }

    const killingSprees = events.filter(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name
    ).length;
    const assists = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.Assisters.includes(account.summoner.name)
    ).length;

    return (Math.min(1, killingSprees) + Math.min(1, assists / 10)) / 2.1;
  },
};

export default smartness;
