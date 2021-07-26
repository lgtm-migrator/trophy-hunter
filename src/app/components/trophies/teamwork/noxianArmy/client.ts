import { TrophyClient } from '../../types';
import base from './base';

const noxianArmy: TrophyClient = {
  ...base,
  checkLive: ({ allPlayers, account, gameData }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const requiredKills = gameData.gameMode === 'ARAM' ? 10 : 8;
    const requiredDeaths = gameData.gameMode === 'ARAM' ? 10 : 8;
    const requiredAssists = gameData.gameMode === 'ARAM' ? 5 : 6;

    if (accountPlayer.scores.deaths > requiredDeaths) {
      return 0;
    }

    return (
      (Math.min(1, accountPlayer.scores.kills / requiredKills) +
        Math.min(1, accountPlayer.scores.assists / requiredAssists)) /
      2.1
    );
  },
};

export default noxianArmy;
