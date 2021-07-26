import { TrophyServer } from '../../types';
import base from './base';

const immortal: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    return Number(
      participant.stats.deaths < 1 &&
        match.gameDuration >= 1500 &&
        participant.stats.win
    );
  },
};

export default immortal;
