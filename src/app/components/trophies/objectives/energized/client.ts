import { TrophyClient } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const energized: TrophyClient = {
  ...base,
  checkLive: ({ allPlayers, events, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const teamNames = allPlayers
      .filter((player) => player.team === accountPlayer.team)
      .map((player) => player.summonerName);

    const buildingKills = events.filter(
      (event) =>
        (event.EventName === 'TurretKilled' ||
          event.EventName === 'InhibKilled') &&
        teamNames.includes(event.KillerName)
    );

    const baronKills = events.filter(
      (event) =>
        event.EventName === 'BaronKill' && teamNames.includes(event.KillerName)
    );

    const energizedScore = Math.max(
      ...baronKills.map(
        (event) =>
          buildingKills.filter(
            (buildingKill) =>
              buildingKill.EventTime < event.EventTime + 210 &&
              buildingKill.EventTime > event.EventTime
          ).length
      )
    );

    const trophyProgress = getTrophyProgress(account, 'energized');
    return energizedScore / 5 + trophyProgress;
  },
};

export default energized;
