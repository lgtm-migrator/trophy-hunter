import { TrophyClient } from '../../types';
import base from './base';

const revenantOfTheKaiser: TrophyClient = {
  ...base,
  checkLive: ({ events, allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const teamNames = allPlayers
      .filter((player) => player.team === accountPlayer.team)
      .map((player) => player.summonerName);

    const elderDragonKills = events.filter(
      (event) =>
        event.DragonType === 'Elder' && teamNames.includes(event.KillerName)
    );

    const baronKills = events.filter(
      (event) =>
        event.EventName === 'BaronKill' && teamNames.includes(event.KillerName)
    );

    const hasElderIntoBaronKill = elderDragonKills.some((elderDragonKill) =>
      baronKills.some(
        (baronKill) =>
          baronKill.EventTime > elderDragonKill.EventTime &&
          elderDragonKill.EventTime + 60 > baronKill.EventTime
      )
    );
    return Number(hasElderIntoBaronKill);
  },
};

export default revenantOfTheKaiser;
