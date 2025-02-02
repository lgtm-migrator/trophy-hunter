import { getTrophyProgress } from '../../../../lib/accounts/helpers';
import { TrophyServer } from '../../types';
import base from './base';

const scrounger: TrophyServer = {
  ...base,
  checkProgress: ({ account, participant }) => {
    const trophyProgress = getTrophyProgress(account, 'scrounger');
    return (
      (participant.objectivesStolenAssists + participant.objectivesStolen) / 3 +
      trophyProgress
    );
  },
};

export default scrounger;
