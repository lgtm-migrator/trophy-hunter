import { TrophyClient } from '../../types';
import base from './base';

const assassinsCreed: TrophyClient = {
  ...base,
  checkLive: ({ events, account }) => {
    const soloKills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.Assisters.length === 0
    ).length;
    return soloKills / 7;
  },
};

export default assassinsCreed;
