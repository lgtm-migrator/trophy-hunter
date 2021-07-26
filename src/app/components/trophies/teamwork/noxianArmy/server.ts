import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/overwolf';

const noxianArmy: TrophyServer = {
  ...base,
  checkProgress: ({ participant, match }) => {
    const requiredKills = match.queueId === ARAM_HOWLING_ABYSS ? 10 : 8;
    const requiredDeaths = match.queueId === ARAM_HOWLING_ABYSS ? 10 : 8;
    const requiredAssists = match.queueId === ARAM_HOWLING_ABYSS ? 5 : 6;
    return Number(
      participant.stats.kills >= requiredKills &&
        participant.stats.deaths <= requiredDeaths &&
        participant.stats.assists >= requiredAssists
    );
  },
};

export default noxianArmy;
