import { TrophyClient } from '../../types';
import base from './base';
import { warn } from '../../../../lib/logs';

const precision: TrophyClient = {
  ...base,
  checkLive: ({ allPlayers, trophyData, gameData, account }) => {
    if (!allPlayers || !gameData || trophyData.precision) {
      return 0;
    }
    if (gameData.gameTime < 600 || gameData.gameTime > 660) {
      return 0;
    }
    trophyData.precision = true;

    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );
    const opponent = allPlayers.find(
      (player) =>
        player.position === accountPlayer.position &&
        player.team !== accountPlayer.team
    );
    if (!opponent) {
      warn(
        `Can not find lane opponent for ${accountPlayer.summonerName} as ${accountPlayer.position}`
      );
      return 0;
    }

    return Number(
      accountPlayer.scores.creepScore >= opponent.scores.creepScore + 15
    );
  },
};

export default precision;
