import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/overwolf';

const sai: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant, match }) => {
    const killsBefore10 = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.timestamp <= 10 * 60000
    ).length;

    const requiredTakedowns = match.queueId === ARAM_HOWLING_ABYSS ? 5 : 4;
    return killsBefore10 / requiredTakedowns;
  },
};

export default sai;
