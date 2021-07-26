import { TrophyClient } from '../../types';
import base from './base';

const teamEffort: TrophyClient = {
  ...base,
  checkLive: ({ events, account, gameData }) => {
    const requiredTeamKills = gameData.gameMode === 'ARAM' ? 9 : 3;

    const teamEffortKills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        (event.KillerName === account.summoner.name ||
          event.Assisters?.includes(account.summoner.name)) &&
        event.Assisters?.length >= 4
    ).length;

    return teamEffortKills / requiredTeamKills;
  },
};

export default teamEffort;
