import { TrophyServer } from '../../types';
import base from './base';

const igniteKill: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const killWithIgnite = events.some(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.victimDamageReceived[event.victimDamageReceived.length - 1]
          .participantId === participant.participantId &&
        event.victimDamageReceived[event.victimDamageReceived.length - 1]
          .spellName === 'summonerdot'
    );
    return Number(killWithIgnite);
  },
};

export default igniteKill;
