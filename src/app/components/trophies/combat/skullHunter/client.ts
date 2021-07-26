import { TrophyClient } from '../../types';
import base from './base';

import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const skullHunter: TrophyClient = {
  ...base,
  checkLive: ({ allPlayers, trophyData, gameData, account }) => {
    if (
      !allPlayers ||
      !gameData ||
      trophyData.skullHunter ||
      gameData.gameTime > 1200
    ) {
      return 0;
    }

    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );
    const trophyProgress = getTrophyProgress(account, 'skullHunter');

    const killsAssists =
      accountPlayer.scores.assists + accountPlayer.scores.kills;
    const process = Math.min(1, killsAssists / 20 + trophyProgress);
    if (process === 1) {
      trophyData.skullHunter = true;
    }
    return process;
  },
};

export default skullHunter;
