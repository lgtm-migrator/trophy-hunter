import { TrophyServer } from '../../types';
import base from './base';

const sandsOfTime: TrophyServer = {
  ...base,
  checkProgress: ({ match }) => {
    return Number(match.gameDuration >= 3000);
  },
};

export default sandsOfTime;
