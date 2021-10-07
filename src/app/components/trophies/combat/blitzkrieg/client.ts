import { TrophyClient } from '../../types';
import base from './base';

const fertilizer: TrophyClient = {
  ...base,
  checkLive: ({ activePlayer, events, account }) => {
    if (!events.length || activePlayer.level >= 3) {
      return 0;
    }

    const hasKill = events.some(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name
    );
    return Number(hasKill);
  },
};

export default fertilizer;
