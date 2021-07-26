import { TrophyClient } from '../../types';
import base from './base';

const sweetHoney: TrophyClient = {
  ...base,
  checkLive: ({ allPlayers, gameData, account }) => {
    if (gameData.gameTime > 1200) {
      return 0;
    }

    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const process = Math.min(1, accountPlayer.scores.creepScore / 165);
    return process;
  },
};

export default sweetHoney;
