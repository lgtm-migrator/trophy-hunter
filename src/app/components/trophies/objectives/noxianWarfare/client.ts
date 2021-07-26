import { TrophyClient } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const noxianWarfare: TrophyClient = {
  ...base,
  checkLive: ({ events, account }) => {
    const destructs = events.filter(
      (event) =>
        event.EventName === 'TurretKilled' || event.EventName === 'InhibKilled'
    );
    const mostDestructs =
      destructs.filter(
        (destruct) =>
          destruct.KillerName === account.summoner.name ||
          destruct.Assisters.includes(account.summoner.name)
      ).length >= destructs.length;

    if (!mostDestructs) {
      return 0;
    }

    const trophyProgress = getTrophyProgress(account, 'noxianWarfare');
    return Number(mostDestructs) / 3 + trophyProgress;
  },
};

export default noxianWarfare;
