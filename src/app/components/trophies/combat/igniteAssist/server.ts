import { TrophyServer } from '../../types';
import base from './base';

const igniteAssist: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const assistWithIgnite = events.some(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.victimDamageReceived.some(
          (damageDealt) =>
            damageDealt.participantId === participant.participantId &&
            damageDealt.spellName === 'summonerdot'
        )
    );
    return Number(assistWithIgnite);
  },
};

export default igniteAssist;
