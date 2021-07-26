import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/overwolf';

const teamPlayer: TrophyServer = {
  ...base,
  checkProgress: ({ participant, match }) => {
    const requiredAssists = match.queueId === ARAM_HOWLING_ABYSS ? 20 : 10;
    return participant.stats.assists / requiredAssists;
  },
};

export default teamPlayer;
