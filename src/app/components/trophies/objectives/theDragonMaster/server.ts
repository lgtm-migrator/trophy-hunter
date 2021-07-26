import { TrophyServer } from '../../types';
import base from './base';

const theDragonMaster: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const earlyDragonKill = events.some(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterType === 'DRAGON' &&
        event.timestamp < 10 * 60 * 1000 &&
        event.killerId === participant.participantId
    );
    return Number(earlyDragonKill);
  },
};

export default theDragonMaster;
