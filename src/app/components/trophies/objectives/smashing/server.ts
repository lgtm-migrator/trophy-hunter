import { TrophyServer } from '../../types';
import base from './base';

const smashing: TrophyServer = {
  ...base,
  checkProgress: ({ participant, events }) => {
    const turretPlatesDestroyed = events.filter(
      (event) =>
        event.type === 'TURRET_PLATE_DESTROYED' &&
        event.killerId === participant.participantId
    );
    return turretPlatesDestroyed.length / 2;
  },
};

export default smashing;
