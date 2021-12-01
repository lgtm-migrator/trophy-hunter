import { EliteMonsterKill } from '../../../../lib/riot/types';
import { TrophyServer } from '../../types';
import base from './base';

const shellyAndShirley: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const heraldKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterType === 'RIFTHERALD'
    ) as EliteMonsterKill[];
    const shellyKill = heraldKills[0];
    const shirleyKill = heraldKills[0];
    if (!shellyKill || shellyKill.killerTeamId !== participant.teamId) {
      return 0;
    }
    if (!shirleyKill || shirleyKill.killerTeamId !== participant.teamId) {
      return 0.5;
    }
    return 1;
  },
};

export default shellyAndShirley;
