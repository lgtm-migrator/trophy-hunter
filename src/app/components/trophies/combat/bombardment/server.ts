import { ARAM_HOWLING_ABYSS } from '../../../../lib/overwolf';
import { TrophyServer } from '../../types';
import base from './base';

const bombardment: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const damagePerMinute =
      (60 * participant.stats.totalDamageDealtToChampions) / match.gameDuration;

    if (match.queueId === ARAM_HOWLING_ABYSS) {
      return damagePerMinute / 1500;
    }

    return damagePerMinute / 1000;
  },
};

export default bombardment;
