import { TrophyClient } from '../../types';
import base from './base';

const feedThem: TrophyClient = {
  ...base,
  checkLive: ({ gameData, events, account }) => {
    const assists = events.reduce<{ [teammate: string]: number }>(
      (assists, event) => {
        if (
          event.EventName !== 'ChampionKill' ||
          !event.Assisters.includes(account.summoner.name)
        ) {
          return assists;
        }
        const teammate = event.KillerName;
        return {
          ...assists,
          [teammate]: (assists[teammate] || 0) + 1,
        };
      },
      {}
    );

    if (gameData.gameMode === 'ARAM') {
      const validAssists = Object.values(assists).filter(
        (assist) => assist >= 3
      ).length;
      return validAssists / 4;
    }

    return Object.keys(assists).length / 4;
  },
};

export default feedThem;
