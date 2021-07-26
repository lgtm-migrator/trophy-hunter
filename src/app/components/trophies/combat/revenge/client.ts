import { TrophyClient } from '../../types';
import base from './base';
import {
  calcDeathTime,
  eventTimeToTimestamp,
} from '../../../../lib/riot/helpers';

const revenge: TrophyClient = {
  ...base,
  checkLive: ({ activePlayer, trophyData, events, account }) => {
    if (!events.length || !activePlayer || trophyData.revenge) {
      return 0;
    }
    const kills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name
    );
    const deaths = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.VictimName === account.summoner.name
    );

    const revengeKills = kills.filter(
      (kill) =>
        deaths.filter((death) => {
          const level = activePlayer.level;
          const deathTimestamp = eventTimeToTimestamp(death.EventTime);
          const killTimestamp = eventTimeToTimestamp(kill.EventTime);
          const deathTime = calcDeathTime(level, deathTimestamp);

          const isKillerNowVictim = death.KillerName === kill.VictimName;
          const isDeathBeforeKill = deathTimestamp < killTimestamp;
          const isDeathAtMost60SBeforeKill =
            deathTimestamp + deathTime + 60000 > killTimestamp;
          return (
            isKillerNowVictim && isDeathBeforeKill && isDeathAtMost60SBeforeKill
          );
        }).length > 0
    ).length;

    if (revengeKills >= 1) {
      trophyData.revenge = true;
    }
    return Number(revengeKills > 1);
  },
};

export default revenge;
