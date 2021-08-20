import { TrophyServer } from '../../types';
import base from './base';

const omnismash: TrophyServer = {
  ...base,
  checkProgress: ({ participant, events }) => {
    const botLaneDestroyed = events.some(
      (event) =>
        event.type === 'TURRET_PLATE_DESTROYED' &&
        event.killerId === participant.participantId &&
        event.laneType === 'BOT_LANE'
    );
    const midLaneDestroyed = events.some(
      (event) =>
        event.type === 'TURRET_PLATE_DESTROYED' &&
        event.killerId === participant.participantId &&
        event.laneType === 'MID_LANE'
    );
    const topLaneDestroyed = events.some(
      (event) =>
        event.type === 'TURRET_PLATE_DESTROYED' &&
        event.killerId === participant.participantId &&
        event.laneType === 'TOP_LANE'
    );
    return (
      (Number(botLaneDestroyed) +
        Number(midLaneDestroyed) +
        Number(topLaneDestroyed)) /
      3
    );
  },
};

export default omnismash;
