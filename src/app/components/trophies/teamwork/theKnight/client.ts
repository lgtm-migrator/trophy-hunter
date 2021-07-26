import { TrophyClient } from '../../types';
import base from './base';
import {
  calcDeathTime,
  eventTimeToTimestamp,
} from '../../../../lib/riot/helpers';

const theKnight: TrophyClient = {
  ...base,
  checkLive: ({ events, allPlayers, account }) => {
    const allKills = events.filter(
      (event) => event.EventName === 'ChampionKill'
    );
    const isValid = allKills.some((kill, index) => {
      if (index < 9 || kill.VictimName === account.summoner.name) {
        return false;
      }
      let currentDeaths = 1;
      for (let i = 1; i < 9; i++) {
        const otherKill = allKills[index - i];
        const level = allPlayers.find(
          (player) => player.summonerName === otherKill.VictimName
        )?.level;
        const killTimestamp = eventTimeToTimestamp(kill.EventTime);
        const otherKillTimestamp = eventTimeToTimestamp(otherKill.EventTime);
        const deathTime = calcDeathTime(level, otherKillTimestamp);

        const killedBefore = otherKillTimestamp <= killTimestamp;
        const stillDead = otherKillTimestamp + deathTime >= killTimestamp;
        const notParticipant = otherKill.VictimName !== account.summoner.name;
        currentDeaths += Number(killedBefore && stillDead && notParticipant);
        if (!(killedBefore && stillDead && notParticipant)) {
          break;
        }
      }
      return currentDeaths === 9;
    });
    return Number(isValid);
  },
};

export default theKnight;
