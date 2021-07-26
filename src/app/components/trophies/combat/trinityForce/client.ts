import { TrophyClient } from '../../types';
import base from './base';

const trinityForce: TrophyClient = {
  ...base,
  checkLive: ({ allPlayers, events, gameData, trophyData, account }) => {
    if (
      trophyData.trinityForce &&
      (trophyData.trinityForce.obtained ||
        trophyData.trinityForce.gameTime + 180 < gameData.gameTime)
    ) {
      return 0;
    }

    const player = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );
    const hasTrinityForce = player.items.find((item) => item.itemID === 3078);
    if (!hasTrinityForce) {
      return 0;
    }

    if (!trophyData.trinityForce) {
      trophyData.trinityForce = {
        gameTime: gameData.gameTime,
        obtained: false,
      };
    }

    const killIn3Minutes = !!events.find(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.EventTime > trophyData.trinityForce.gameTime &&
        trophyData.trinityForce.gameTime < event.EventTime + 180
    );
    if (killIn3Minutes) {
      trophyData.trinityForce.obtained = true;
    }
    return Number(killIn3Minutes);
  },
};

export default trinityForce;
