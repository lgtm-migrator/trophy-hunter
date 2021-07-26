import { TrophyClient } from '../../types';
import base from './base';

const fullHouse: TrophyClient = {
  ...base,
  checkLive: ({ events, account, gameData }) => {
    const doubleKills = events.filter(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name &&
        event.KillStreak === 2
    );
    const tripleKills = events.filter(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name &&
        event.KillStreak === 3
    );
    let progress = Math.min(1, tripleKills.length);
    if (gameData.gameMode === 'ARAM') {
      progress += Math.min(1, doubleKills.length / 3);
    } else {
      progress += Math.min(1, doubleKills.length);
    }
    return progress / 2;
  },
};

export default fullHouse;
