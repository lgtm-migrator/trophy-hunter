import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/overwolf';

const sinisterBlades: TrophyServer = {
  ...base,
  checkProgress: ({ participant, match }) => {
    const requiredDoubleKills = match.queueId === ARAM_HOWLING_ABYSS ? 7 : 4;
    return participant.stats.doubleKills / requiredDoubleKills;
  },
};

export default sinisterBlades;
