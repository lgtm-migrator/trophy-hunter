import { TrophyClient } from '../../types';
import base from './base';

const invade: TrophyClient = {
  ...base,
  checkLive: ({ events, account }) => {
    const hasInvadeKillParticipation = events.some(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.EventTime < 75 &&
        (event.VictimName === account.summoner.name ||
          event.Assisters.includes(account.summoner.name))
    );

    return Number(hasInvadeKillParticipation);
  },
};

export default invade;
