import { TrophyClient } from '../../types';
import base from './base';

const demolitionPear: TrophyClient = {
  ...base,
  checkLive: ({ events, account }) => {
    const turretKills = events.filter(
      (event) =>
        event.EventName === 'TurretKilled' &&
        event.KillerName === account.summoner.name
    ).length;

    return turretKills / 5;
  },
};

export default demolitionPear;
