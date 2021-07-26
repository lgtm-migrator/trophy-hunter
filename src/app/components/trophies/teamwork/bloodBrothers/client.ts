import { TrophyClient } from '../../types';
import base from './base';

const bloodBrothers: TrophyClient = {
  ...base,
  checkLive: ({ events, account, gameData }) => {
    const duoKillsEvents = events.reduce<{ [teammate: string]: number }>(
      (duoKills, event) => {
        if (
          event.EventName !== 'ChampionKill' ||
          (event.KillerName !== account.summoner.name &&
            !event.Assisters.includes(account.summoner.name)) ||
          event.Assisters.length !== 1
        ) {
          return duoKills;
        }
        const teammate =
          event.KillerName === account.summoner.name
            ? event.Assisters[0]
            : event.KillerName;
        return {
          ...duoKills,
          [teammate]: (duoKills[teammate] || 0) + 1,
        };
      },
      {}
    );
    const duoKills = Math.max(...Object.values(duoKillsEvents), 0);
    if (gameData.gameMode === 'ARAM') {
      return duoKills / 5;
    }
    return duoKills / 7;
  },
};

export default bloodBrothers;
