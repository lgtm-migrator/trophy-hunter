import { TrophyClient } from '../../types';
import base from './base';

const pentaKill: TrophyClient = {
  ...base,
  checkLive: ({ events, account }) => {
    const hasPentaKill = events.some(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillStreak === 5 &&
        event.KillerName === account.summoner.name
    );

    return Number(hasPentaKill);
  },
};

export default pentaKill;
