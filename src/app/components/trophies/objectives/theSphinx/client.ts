import { TrophyClient } from '../../types';
import base from './base';

const theSphinx: TrophyClient = {
  ...base,
  checkLive: ({ events, allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const teamNames = allPlayers
      .filter((player) => player.team === accountPlayer.team)
      .map((player) => player.summonerName);

    const earthDragonKills = events.filter(
      (event) =>
        event.EventName === 'DragonKill' &&
        event.DragonType === 'Earth' &&
        teamNames.includes(event.KillerName)
    ).length;

    return earthDragonKills / 3;
  },
};

export default theSphinx;
