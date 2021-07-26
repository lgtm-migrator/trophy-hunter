import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/overwolf';

const lunatic: TrophyServer = {
  ...base,
  checkProgress: ({ participant, match }) => {
    const requiredKills = match.queueId === ARAM_HOWLING_ABYSS ? 24 : 20;
    return participant.stats.kills / requiredKills;
  },
};

export default lunatic;
