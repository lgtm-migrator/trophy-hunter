import { TrophyClient } from '../../types';
import base from './base';

const appetizer: TrophyClient = {
  ...base,
  checkLive: ({ allPlayers, gameData, account }) => {
    if (gameData.gameTime > 600) {
      return 0;
    }

    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const process = Math.min(1, accountPlayer.scores.creepScore / 80);
    return process;
  },
};

export default appetizer;
