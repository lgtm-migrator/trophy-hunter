import { TrophyClient } from '../../types';
import base from './base';

const lunatic: TrophyClient = {
  ...base,
  checkLive: ({ allPlayers, account, gameData }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const requiredKills = gameData.gameMode === 'ARAM' ? 24 : 20;
    return accountPlayer.scores.kills / requiredKills;
  },
};

export default lunatic;
