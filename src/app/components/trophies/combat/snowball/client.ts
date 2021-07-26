import { TrophyClient } from '../../types';
import base from './base';

const snowball: TrophyClient = {
  ...base,
  checkLive: ({ events, account, gameData }) => {
    const requiredKills = gameData.gameMode === 'ARAM' ? 7 : 5;

    const snowballKills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.EventTime < 720
    ).length;

    return snowballKills / requiredKills;
  },
};

export default snowball;
