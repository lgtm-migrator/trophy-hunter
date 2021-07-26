import { TrophyServer } from '../../types';
import base from './base';
import { getMinionsAtMin } from '../../../../lib/riot/helpers';

const sweetHoney: TrophyServer = {
  ...base,
  checkProgress: ({ participant, timeline }) => {
    const minions = getMinionsAtMin(timeline, 20, participant.participantId);
    return minions / 165;
  },
};

export default sweetHoney;
