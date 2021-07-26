import { TrophyClient } from '../../types';
import base from './base';

const theZombie: TrophyClient = {
  ...base,
  checkLive: ({ events, account, gameData }) => {
    const requiredKills = gameData.gameMode === 'ARAM' ? 3 : 2;
    const kills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name
    );
    const deaths = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.VictimName === account.summoner.name
    );

    const zombieKills = kills.filter((kill) =>
      deaths.some(
        (death) =>
          kill.EventTime > death.EventTime &&
          kill.EventTime < 10 + death.EventTime
      )
    ).length;

    return zombieKills / requiredKills;
  },
};

export default theZombie;
