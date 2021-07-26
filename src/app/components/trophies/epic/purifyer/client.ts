import { TrophyClient } from '../../types';
import base from './base';

const purifyer: TrophyClient = {
  ...base,
  checkLive: ({ allPlayers, account, gameData }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const requiredKills = gameData.gameMode === 'ARAM' ? 32 : 30;
    return accountPlayer.scores.kills / requiredKills;
  },
};

export default purifyer;
