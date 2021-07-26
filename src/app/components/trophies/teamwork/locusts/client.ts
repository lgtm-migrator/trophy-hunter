import { TrophyClient } from '../../types';
import base from './base';

const locusts: TrophyClient = {
  ...base,
  checkLive: ({ events, allPlayers, account, gameData }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const teamNames = allPlayers
      .filter((player) => player.team === accountPlayer.team)
      .map((player) => player.summonerName);

    const locustsKillEvents = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.Assisters?.length >= 4 &&
        teamNames.includes(event.KillerName)
    );
    const requiredKills = gameData.gameMode === 'ARAM' ? 12 : 10;
    return locustsKillEvents.length / requiredKills;
  },
};

export default locusts;
