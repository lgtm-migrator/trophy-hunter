import { TrophyClient } from '../../types';
import base from './base';

const sai: TrophyClient = {
  ...base,
  checkLive: ({ events, account, gameData }) => {
    const killsBefore10 = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.EventTime <= 10 * 60
    ).length;
    const requiredTakedowns = gameData.gameMode === 'ARAM' ? 5 : 4;
    return killsBefore10 / requiredTakedowns;
  },
};

export default sai;
