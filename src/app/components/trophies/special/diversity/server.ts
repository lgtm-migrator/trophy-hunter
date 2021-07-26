import { TrophyServer } from '../../types';
import base from './base';
import {
  getTrophyProgress,
  getTrophyProgressDetails,
} from '../../../../lib/accounts/helpers';

const diversity: TrophyServer = {
  ...base,
  checkProgress: ({ account, participant }) => {
    const trophyProgress = getTrophyProgress(account, 'diversity');
    const trophyProgressDetails = getTrophyProgressDetails(
      account,
      'diversity'
    );
    let newProgress = trophyProgress;
    if (!trophyProgressDetails.includes(participant.championId)) {
      trophyProgressDetails.push(participant.championId);
      newProgress += 1 / 3;
    }
    return {
      progress: newProgress,
      details: trophyProgressDetails,
    };
  },
};

export default diversity;
