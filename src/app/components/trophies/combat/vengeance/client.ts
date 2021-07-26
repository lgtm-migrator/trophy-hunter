import { TrophyClient } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const vengeance: TrophyClient = {
  ...base,
  checkLive: ({ events, allPlayers, account }) => {
    if (!events.length) {
      return 0;
    }

    const ownPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );
    const teammateNames = allPlayers
      .filter(
        (player) =>
          player.summonerName !== ownPlayer.summonerName &&
          player.team === ownPlayer.team
      )
      .map((teammate) => teammate.summonerName);

    const teammateDeaths = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        teammateNames.includes(event.VictimName)
    );

    const kills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === ownPlayer.summonerName
    );

    const vengeanceKills = teammateDeaths.filter((teammateDeath) =>
      kills.find((kill) => {
        const isVicKillBeforeKill = teammateDeath.EventTime < kill.EventTime;
        const isVicKillAtMost10SBefore =
          teammateDeath.EventTime + 10 > kill.EventTime;
        return isVicKillBeforeKill && isVicKillAtMost10SBefore;
      })
    ).length;

    const trophyProgress = getTrophyProgress(account, 'vengeance');
    return vengeanceKills / 3 + trophyProgress;
  },
};

export default vengeance;
