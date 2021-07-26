import { TrophyClient } from '../../types';
import base from './base';

const theHound: TrophyClient = {
  ...base,
  checkLive: ({ events, account, gameData }) => {
    if (gameData.gameMode === 'ARAM') {
      const assists = events.filter(
        (event) =>
          event.EventName === 'ChampionKill' &&
          event.Assisters.includes(account.summoner.name) &&
          event.EventTime < 300
      );
      return assists.length / 8;
    }

    const assists = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.Assisters.includes(account.summoner.name) &&
        event.EventTime < 600
    );
    return assists.length / 5;
  },
};

export default theHound;
