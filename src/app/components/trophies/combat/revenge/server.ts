import { TrophyServer } from '../../types';
import base from './base';
import {
  calcDeathTime,
  calcLevel,
  getParticipantKills,
  getParticipantDeaths,
} from '../../../../lib/riot/helpers';

const revenge: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const kills = getParticipantKills(events, participant.participantId);
    const deaths = getParticipantDeaths(events, participant.participantId);

    const revengeKills = kills.filter(
      (kill) =>
        deaths.filter((death) => {
          const level = calcLevel(
            events,
            participant.participantId,
            death.timestamp
          );
          const deathTime = calcDeathTime(level, death.timestamp);

          const isKillerNowVictim = death.killerId === kill.victimId;
          const isDeathBeforeKill = death.timestamp < kill.timestamp;
          const isDeathAtMost60SBeforeKill =
            death.timestamp + deathTime + 60000 > kill.timestamp;
          return (
            isKillerNowVictim && isDeathBeforeKill && isDeathAtMost60SBeforeKill
          );
        }).length > 0
    ).length;

    return revengeKills;
  },
};

export default revenge;
