import { TrophyServer } from '../../types';
import { getLevelUps } from '../../../../lib/riot/helpers';
import base from './base';

const blitzkrieg: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const levelUps = getLevelUps(events, participant.participantId);
    const levelThreeEvent = levelUps[2];
    if (!levelThreeEvent) {
      return 0;
    }
    const killsBeforeLevelThree = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.timestamp <= levelThreeEvent.timestamp
    );
    return killsBeforeLevelThree.length;
  },
};

export default blitzkrieg;
