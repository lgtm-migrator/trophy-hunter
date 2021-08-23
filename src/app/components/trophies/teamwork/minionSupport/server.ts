import { TrophyServer } from '../../types';
import base from './base';

const minionSupport: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const assistWithIgnite = events.some(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.victimDamageDealt.some(
          (damageDealt) =>
            damageDealt.participantId === participant.participantId
        ) &&
        event.victimDamageDealt.some(
          (damageDealt) => damageDealt.type === 'MINION'
        )
    );
    return Number(assistWithIgnite);
  },
};

export default minionSupport;
