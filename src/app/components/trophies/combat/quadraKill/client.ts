import { TrophyClient } from '../../types';
import base from './base';

const quadraKill: TrophyClient = {
  ...base,
  checkLive: ({ events, account }) => {
    const quadraKill = events.find(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name &&
        event.KillStreak === 4
    );

    return Number(quadraKill);
  },
};

export default quadraKill;
