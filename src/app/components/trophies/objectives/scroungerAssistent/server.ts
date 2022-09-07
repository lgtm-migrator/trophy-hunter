import { TrophyServer } from '../../types';
import base from './base';

const scroungerAssistent: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return participant.objectivesStolenAssists + participant.objectivesStolen;
  },
};

export default scroungerAssistent;
