import { TrophyServer } from '../../types';
import base, { ARAM_MINUTES, SUMMONERS_RIFT_MINUTES } from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/overwolf';
import { minutesToSeconds } from '../../../../lib/utils/dates';

const theElephant: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const requiredTimelimit =
      match.queueId === ARAM_HOWLING_ABYSS
        ? minutesToSeconds(ARAM_MINUTES)
        : minutesToSeconds(SUMMONERS_RIFT_MINUTES);
    if (
      !participant.stats.longestTimeSpentLiving &&
      match.gameDuration >= requiredTimelimit
    ) {
      return 1;
    }
    return participant.stats.longestTimeSpentLiving / requiredTimelimit;
  },
};

export default theElephant;
