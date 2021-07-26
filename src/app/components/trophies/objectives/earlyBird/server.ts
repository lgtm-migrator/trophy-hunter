import { TrophyServer } from '../../types';
import base from './base';

const earlyBird: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    if (
      !participant.stats.firstBloodKill ||
      (!participant.stats.firstTowerAssist && !participant.stats.firstTowerKill)
    ) {
      return 0;
    }
    return 1;
  },
};

export default earlyBird;
