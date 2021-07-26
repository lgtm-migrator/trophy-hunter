import { TrophyClient } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const highSociety: TrophyClient = {
  ...base,
  checkLive: ({ allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const trophyProgress = getTrophyProgress(account, 'highSociety');
    return accountPlayer.scores.assists / 20 + trophyProgress;
  },
};

export default highSociety;
