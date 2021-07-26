import { TrophyClient } from '../../types';
import base from './base';

const landlord: TrophyClient = {
  ...base,
  checkLive: ({ allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );
    return accountPlayer.scores.creepScore / 300;
  },
};

export default landlord;
