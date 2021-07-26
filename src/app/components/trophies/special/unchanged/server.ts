import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgressDetails } from '../../../../lib/accounts/helpers';

const unchanged: TrophyServer = {
  ...base,
  checkProgress: ({ account, participant }) => {
    const trophyProgressDetails = getTrophyProgressDetails(
      account,
      'unchanged'
    );
    const playedSameChampion = [
      ...trophyProgressDetails.filter(
        (championId) => championId === participant.championId
      ),
      participant.championId,
    ];

    return {
      progress: playedSameChampion.length / 3,
      details: playedSameChampion,
    };
  },
};

export default unchanged;
