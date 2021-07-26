import { TrophyClient } from '../../types';
import base from './base';

const tornado: TrophyClient = {
  ...base,
  checkLive: ({ events, allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const teamNames = allPlayers
      .filter((player) => player.team === accountPlayer.team)
      .map((player) => player.summonerName);

    const airDragonKills = events.filter(
      (event) =>
        event.EventName === 'DragonKill' &&
        event.DragonType === 'Air' &&
        teamNames.includes(event.KillerName)
    ).length;

    return airDragonKills / 3;
  },
};

export default tornado;
