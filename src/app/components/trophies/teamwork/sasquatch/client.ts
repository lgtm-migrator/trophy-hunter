import { TrophyClient } from '../../types';
import base from './base';

const sasquatch: TrophyClient = {
  ...base,
  checkLive: ({ events, account }) => {
    const assists = events.reduce<{ [teammate: string]: number }>(
      (assists, event) => {
        if (
          event.EventName !== 'ChampionKill' ||
          event.EventTime >= 720 ||
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
    return Object.keys(assists).length / 3;
  },
};

export default sasquatch;
