import { TrophyClient } from '../../types';
import base from './base';

const theGrandChallenge: TrophyClient = {
  ...base,
  checkLive: ({ events, account }) => {
    const soloKills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.Assisters.length === 0
    );

    const buildingKills = events.filter(
      (event) =>
        (event.EventName === 'TurretKilled' ||
          event.EventName === 'InhibKilled') &&
        (event.KillerName === account.summoner.name ||
          event.Assisters.some(
            (assister) => assister === account.summoner.name
          ))
    );
    const validKills = soloKills.filter((event) =>
      buildingKills.some(
        (buildingKill) =>
          buildingKill.EventTime >= event.EventTime &&
          event.EventTime + 25 >= buildingKill.EventTime
      )
    );
    return validKills.length;
  },
};

export default theGrandChallenge;
