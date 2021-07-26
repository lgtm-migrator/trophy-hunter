import { TrophyClient } from '../../types';
import base from './base';

const warrior: TrophyClient = {
  ...base,
  checkLive: ({ allPlayers, account }) => {
    const player = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );
    const kda =
      (player.scores.kills + player.scores.assists) / player.scores.deaths || 0;
    return Math.min(kda / 1.5, 0.9);
  },
};

export default warrior;
