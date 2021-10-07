import { TrophyServer } from '../../types';
import base from './base';
import { secondsToMinutes } from '../../../../lib/utils/dates';

const doom: TrophyServer = {
  ...base,
  checkProgress: ({ participant, match }) => {
    const gameDurationInMinutes = secondsToMinutes(match.info.gameDuration);
    const ccPerMinute = participant.totalTimeCCDealt / gameDurationInMinutes;
    return ccPerMinute / 6;
  },
};

export default doom;
