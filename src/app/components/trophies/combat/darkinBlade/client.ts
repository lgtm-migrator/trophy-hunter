import { TrophyClient } from '../../types';
import base from './base';

const darkinBlade: TrophyClient = {
  ...base,
  checkLive: ({ allPlayers, events, gameData, trophyData, account }) => {
    if (
      trophyData.darkinBlade &&
      (trophyData.darkinBlade.obtained ||
        trophyData.darkinBlade.gameTime + 180 < gameData.gameTime)
    ) {
      return 0;
    }

    const player = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );
    const hasdarkinBlade = player.items.find((item) => item.itemID === 3124);
    if (!hasdarkinBlade) {
      return 0;
    }

    if (!trophyData.darkinBlade) {
      trophyData.darkinBlade = {
        gameTime: gameData.gameTime,
        obtained: false,
      };
    }

    const killIn3Minutes = !!events.find(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.EventTime > trophyData.darkinBlade.gameTime &&
        trophyData.darkinBlade.gameTime < event.EventTime + 90
    );
    if (killIn3Minutes) {
      trophyData.darkinBlade.obtained = true;
    }
    return Number(killIn3Minutes);
  },
};

export default darkinBlade;
