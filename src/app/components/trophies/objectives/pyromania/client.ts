import { TrophyClient } from '../../types';
import base from './base';

const pyromania: TrophyClient = {
  ...base,
  checkLive: ({ events, allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const teamNames = allPlayers
      .filter((player) => player.team === accountPlayer.team)
      .map((player) => player.summonerName);

    const fireDragonKills = events.filter(
      (event) =>
        event.EventName === 'DragonKill' &&
        event.DragonType === 'Fire' &&
        teamNames.includes(event.KillerName)
    ).length;

    return fireDragonKills / 3;
  },
};

export default pyromania;
