import { EliteMonsterKill } from '../../../../lib/riot/types';
import { TrophyServer } from '../../types';
import base from './base';

const shelly: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const shellyKill = events.find(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterType === 'RIFTHERALD'
    ) as EliteMonsterKill;
    if (!shellyKill || shellyKill.killerTeamId !== participant.teamId) {
      return 0;
    }
    return 1;
  },
};

export default shelly;
