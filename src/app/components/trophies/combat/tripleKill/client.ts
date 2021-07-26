import { TrophyClient } from '../../types';
import base from './base';

const tripleKill: TrophyClient = {
  ...base,
  checkLive: ({ events, account }) => {
    const hasTripleKill = events.some(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name &&
        event.KillStreak === 3
    );
    return Number(hasTripleKill);
  },
};

export default tripleKill;
