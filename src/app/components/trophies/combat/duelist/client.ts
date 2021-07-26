import { TrophyClient } from '../../types';
import base from './base';

const duelist: TrophyClient = {
  ...base,
  checkLive: ({ events, account }) => {
    const soloKills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.Assisters.length === 0
    ).length;
    return soloKills / 3;
  },
};

export default duelist;
