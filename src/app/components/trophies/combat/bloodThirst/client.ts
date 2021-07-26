import { TrophyClient } from '../../types';
import base from './base';

const bloodThirst: TrophyClient = {
  ...base,
  checkLive: ({ events, gameData, account }) => {
    const gameLongEnough = gameData.gameTime > 20 * 60;
    const kills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name
    );
    const atLeastOneKill = kills.length > 0;
    const killTimingsOK = kills.every((kill, index) => {
      let killInTiming = true;
      if (index === 0) {
        // 5 min after minions spawn
        killInTiming = kill.EventTime < 375;
      } else {
        // less than 5 min between consecutive kills
        killInTiming = kill.EventTime < kills[index - 1].EventTime + 300;
      }
      if (index === kills.length - 1) {
        // In 5 min before end
        killInTiming =
          killInTiming && kill.EventTime >= gameData.gameTime - 300;
      }
      return killInTiming;
    });
    const progress =
      Number(gameLongEnough) + Number(atLeastOneKill) + Number(killTimingsOK);
    return progress / 3;
  },
};

export default bloodThirst;
