import { TrophyClient } from '../../types';
import base from './base';

const deepSea: TrophyClient = {
  ...base,
  checkLive: ({ events, allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const teamNames = allPlayers
      .filter((player) => player.team === accountPlayer.team)
      .map((player) => player.summonerName);

    const waterDragonKills = events.filter(
      (event) =>
        event.EventName === 'DragonKill' &&
        event.DragonType === 'Water' &&
        teamNames.includes(event.KillerName)
    ).length;

    return waterDragonKills / 3;
  },
};

export default deepSea;
