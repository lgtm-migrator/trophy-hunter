import { TrophyClient } from '../../types';
import base from './base';

const unleashThePower: TrophyClient = {
  ...base,
  checkLive: ({ events, activePlayer, gameData, trophyData, account }) => {
    if (!trophyData.unleashThePower && activePlayer.level === 6) {
      trophyData.unleashThePower = gameData.gameTime;
    }

    if (!trophyData.unleashThePower) {
      return 0;
    }

    const requiredTimelimt = gameData.gameMode === 'ARAM' ? 20 : 30;
    const hasKillInTimeframe = events.some(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.EventTime > trophyData.unleashThePower &&
        event.EventTime + requiredTimelimt < trophyData.unleashThePower
    );

    return Number(hasKillInTimeframe);
  },
};

export default unleashThePower;
