import { TrophyServer } from '../../types';
import base from './base';
import { getLaneOpponent } from '../../../../lib/riot/helpers';

const flameHorizon: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const laneOpponent = getLaneOpponent(match.participants, participant);
    if (!laneOpponent) {
      return 0;
    }
    return (
      (participant.stats.totalMinionsKilled +
        participant.stats.neutralMinionsKilled) /
      (laneOpponent.stats.totalMinionsKilled +
        laneOpponent.stats.neutralMinionsKilled +
        100)
    );
  },
};

export default flameHorizon;
