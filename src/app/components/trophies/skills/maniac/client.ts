import { TrophyClient } from '../../types';
import base from './base';

const maniac: TrophyClient = {
  ...base,
  checkLive: ({ allPlayers, account, gameData }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const requiredKills = gameData.gameMode === 'ARAM' ? 12 : 10;
    return accountPlayer.scores.kills / requiredKills;
  },
};

export default maniac;
