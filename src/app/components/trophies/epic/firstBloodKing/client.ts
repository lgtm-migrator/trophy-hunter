import { TrophyClient } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const firstBloodKing: TrophyClient = {
  ...base,
  checkLive: ({ events, account }) => {
    const firstKill = events.find(
      (event) => event.EventName === 'ChampionKill'
    );

    const firstBloodKill =
      firstKill && firstKill.KillerName === account.summoner.name;

    if (!firstBloodKill) {
      return 0;
    }

    const trophyProgress = getTrophyProgress(account, 'firstBloodKing');

    return Number(firstBloodKill) / 3 + trophyProgress;
  },
};

export default firstBloodKing;
