import { TrophyServer } from '../../types';
import base from './base';
import { getLaneOpponent } from '../../../../lib/riot/helpers';

const theSpartan: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    if (participant.timeline.role !== 'SOLO') {
      return 0;
    }
    const xpAt10 = participant.timeline.xpPerMinDeltas['0-10'] * 10;
    const laneOpponent = getLaneOpponent(match.participants, participant);

    if (!laneOpponent) {
      return 0;
    }

    const xpAt10OtherLaner = laneOpponent.timeline.xpPerMinDeltas['0-10'] * 10;
    return Number(xpAt10OtherLaner + 1200 <= xpAt10);
  },
};

export default theSpartan;
