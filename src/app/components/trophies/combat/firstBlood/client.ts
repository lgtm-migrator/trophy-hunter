import { TrophyClient } from '../../types';
import base from './base';

const firstBlood: TrophyClient = {
  ...base,
  checkLive: ({ events, account }) => {
    const firstKill = events.find(
      (event) => event.EventName === 'ChampionKill'
    );

    const firstBloodKill =
      firstKill && firstKill.KillerName === account.summoner.name;

    return Number(firstBloodKill);
  },
};

export default firstBlood;
