import { TrophyClient } from '../../types';
import base from './base';

const farmer: TrophyClient = {
  ...base,
  checkLive: ({ allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );
    return accountPlayer.scores.creepScore / 200;
  },
};

export default farmer;
