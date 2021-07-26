import { TrophyClient } from '../../types';
import base from './base';

const skullMedal: TrophyClient = {
  ...base,
  checkLive: ({ events, account }) => {
    const killingSprees = events.filter(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name
    ).length;
    const inhibitorKills = events.filter(
      (event) =>
        event.EventName === 'InhibKilled' &&
        event.KillerName === account.summoner.name
    ).length;

    return (
      (Math.min(1, killingSprees / 2) + Math.min(1, inhibitorKills / 2)) / 2
    );
  },
};

export default skullMedal;
