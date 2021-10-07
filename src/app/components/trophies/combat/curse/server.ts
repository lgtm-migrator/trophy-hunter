import { TrophyServer } from '../../types';
import base from './base';
import { secondsToMinutes } from '../../../../lib/utils/dates';

const curse: TrophyServer = {
  ...base,
  checkProgress: ({ participant, match }) => {
    const gameDurationInMinutes = secondsToMinutes(match.info.gameDuration);
    const ccPerMinute = participant.totalTimeCCDealt / gameDurationInMinutes;
    return ccPerMinute / 4;
  },
};

export default curse;
