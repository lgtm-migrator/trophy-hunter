import { TrophyClient } from '../../types';
import base from './base';
import { Event } from '../../types';
import { zip } from '../../../../lib/utils/arrays';

const annihilation: TrophyClient = {
  ...base,
  checkLive: ({ events, account, gameData }) => {
    const killsAndAssists = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        (event.KillerName === account.summoner.name ||
          event.Assisters.includes(account.summoner.name))
    );
    const annihilations = zip(killsAndAssists, killsAndAssists.slice(4)).filter(
      ([a, b]: [Event, Event]) => b && a.EventTime + 25 >= b.EventTime
    ).length;

    if (gameData.gameMode === 'ARAM') {
      return annihilations / 2;
    }
    return annihilations;
  },
};

export default annihilation;
