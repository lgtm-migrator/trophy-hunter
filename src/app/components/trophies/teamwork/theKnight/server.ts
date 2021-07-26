import { TrophyServer } from '../../types';
import base from './base';
import {
  getAllKills,
  calcDeathTime,
  calcLevel,
} from '../../../../lib/riot/helpers';

const theKnight: TrophyServer = {
  ...base,
  checkProgress: ({ participant, events }) => {
    const allKills = getAllKills(events);
    const isValid = allKills.some((kill, index) => {
      if (index < 9 || kill.victimId === participant.participantId) {
        return false;
      }

      let currentDeaths = 1;
      for (let i = 1; i < 9; i++) {
        const otherKill = allKills[index - i];
        const level = calcLevel(
          events,
          otherKill.victimId,
          otherKill.timestamp
        );
        const deathTime = calcDeathTime(level, otherKill.timestamp);

        const killedBefore = otherKill.timestamp <= kill.timestamp;
        const stillDead = otherKill.timestamp + deathTime >= kill.timestamp;
        const notParticipant = otherKill.victimId !== participant.participantId;
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
