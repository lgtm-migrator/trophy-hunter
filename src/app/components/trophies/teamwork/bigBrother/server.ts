import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const bigBrother: TrophyServer = {
  ...base,
  checkProgress: ({ match, account, participant }) => {
    const maxVisionScore = Math.max(
      ...match.participants.map((other) => other.stats.visionScore)
    );
    const hasHighestVisionScore =
      participant.stats.visionScore >= maxVisionScore;

    const trophyProgress = getTrophyProgress(account, 'bigBrother');
    return Number(hasHighestVisionScore) / 3 + trophyProgress;
  },
};

export default bigBrother;
