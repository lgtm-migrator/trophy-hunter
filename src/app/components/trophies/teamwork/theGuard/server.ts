import { TrophyServer } from '../../types';
import base from './base';
import { findPerk } from '../../../../lib/accounts/helpers';

const theGuard: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    const guardian = findPerk(participant, 8465);
    return Number(guardian.var1 >= 4000);
  },
};

export default theGuard;
