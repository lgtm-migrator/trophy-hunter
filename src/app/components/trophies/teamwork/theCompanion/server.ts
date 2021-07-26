import { TrophyServer } from '../../types';
import base from './base';
import { findPerk } from '../../../../lib/accounts/helpers';

const theCompanion: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    const summonerAery = findPerk(participant, 8214);
    return Number(summonerAery.var1 >= 750 && summonerAery.var2 >= 750);
  },
};

export default theCompanion;
