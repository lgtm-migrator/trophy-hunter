import { TrophyServer } from '../../types';
import base from './base';
import { getMinionsAtMin } from '../../../../lib/riot/helpers';

const appetizer: TrophyServer = {
  ...base,
  checkProgress: ({ participant, timeline }) => {
    const minions = getMinionsAtMin(timeline, 10, participant.participantId);
    return minions / 80;
  },
};

export default appetizer;
