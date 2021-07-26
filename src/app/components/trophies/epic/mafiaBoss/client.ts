import { TrophyClient } from '../../types';
import base from './base';

const mafiaBoss: TrophyClient = {
  ...base,
  checkLive: ({ allPlayers, account, gameData }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );
    const requiredAssists = gameData.gameMode === 'ARAM' ? 40 : 30;
    return accountPlayer.scores.assists / requiredAssists;
  },
};

export default mafiaBoss;
