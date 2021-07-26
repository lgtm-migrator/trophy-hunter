import { TrophyClient } from '../../types';
import base from './base';
import { Event } from '../../types';

const ninjas: TrophyClient = {
  ...base,
  checkLive: ({ events, account }) => {
    const duoKills = events.reduce<{ [teammate: string]: Event[] }>(
      (duoKills, event) => {
        if (
          event.EventName !== 'ChampionKill' ||
          (event.KillerName !== account.summoner.name &&
            !event.Assisters.includes(account.summoner.name)) ||
          event.Assisters.length !== 1
        ) {
          return duoKills;
        }
        const teammate =
          event.KillerName === account.summoner.name
            ? event.Assisters[0]
            : event.KillerName;
        return {
          ...duoKills,
          [teammate]: [...(duoKills[teammate] || []), event],
        };
      },
      {}
    );

    const hasDuoTripleKills = Object.values(duoKills).some(
      (duoKills) =>
        duoKills.length >= 3 &&
        duoKills[0].EventTime + 10 > duoKills[1].EventTime &&
        duoKills[1].EventTime + 10 > duoKills[2].EventTime
    );

    return Number(hasDuoTripleKills);
  },
};

export default ninjas;
