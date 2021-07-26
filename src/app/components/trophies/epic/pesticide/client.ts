import { TrophyClient } from '../../types';
import base from './base';

const pesticide: TrophyClient = {
  ...base,
  checkLive: ({ allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    return accountPlayer.scores.creepScore / 380;
  },
};

export default pesticide;
