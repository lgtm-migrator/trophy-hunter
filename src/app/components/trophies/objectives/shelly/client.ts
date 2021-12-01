import { TrophyClient } from '../../types';
import base from './base';

const shelly: TrophyClient = {
  ...base,
  checkLive: ({ allPlayers, events, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const teamNames = allPlayers
      .filter((player) => player.team === accountPlayer.team)
      .map((player) => player.summonerName);

    const shellyKill = events.find((event) => event.EventName === 'HeraldKill');
    if (!shellyKill || !teamNames.includes(shellyKill.KillerName)) {
      return 0;
    }
    return 1;
  },
};

export default shelly;
