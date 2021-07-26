import { TrophyClient } from '../../types';
import base from './base';

const teamPlayer: TrophyClient = {
  ...base,
  checkLive: ({ events, account, gameData }) => {
    const requiredAssists = gameData.gameMode === 'ARAM' ? 20 : 10;
    const assists = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.Assisters.includes(account.summoner.name)
    );

    return assists.length / requiredAssists;
  },
};

export default teamPlayer;
