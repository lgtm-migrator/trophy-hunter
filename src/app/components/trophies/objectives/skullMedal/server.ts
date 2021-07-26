import { TrophyServer } from '../../types';
import base from './base';

const skullMedal: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return Number(
      participant.stats.killingSprees >= 2 &&
        participant.stats.inhibitorKills >= 2
    );
  },
};

export default skullMedal;
