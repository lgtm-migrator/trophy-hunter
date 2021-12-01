import { TrophyClient } from '../../types';
import base from './base';

const shellyAndShirley: TrophyClient = {
  ...base,
  checkLive: ({ allPlayers, events, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const teamNames = allPlayers
      .filter((player) => player.team === accountPlayer.team)
      .map((player) => player.summonerName);

    const heraldKills = events.filter(
      (event) => event.EventName === 'HeraldKill'
    );
    const shellyKill = heraldKills[0];
    const shirleyKill = heraldKills[1];
    if (!shellyKill || !teamNames.includes(shellyKill.KillerName)) {
      return 0;
    }
    if (!shirleyKill || !teamNames.includes(shirleyKill.KillerName)) {
      return 0.5;
    }
    return 1;
  },
};

export default shellyAndShirley;
