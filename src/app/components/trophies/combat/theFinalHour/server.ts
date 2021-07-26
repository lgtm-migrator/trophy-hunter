import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/overwolf';

const theFinalHour: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant }) => {
    const killsAtEndgame = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.timestamp >= match.gameDuration * 1000 - 600000
    ).length;

    const requiredKills = match.queueId === ARAM_HOWLING_ABYSS ? 14 : 10;
    return killsAtEndgame / requiredKills;
  },
};

export default theFinalHour;
