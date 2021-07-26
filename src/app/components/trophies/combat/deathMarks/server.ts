import { TrophyServer } from '../../types';
import base, { REQUIRED_SECONDS } from './base';
import { getAllKills } from '../../../../lib/riot/helpers';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const deathMarks: TrophyServer = {
  ...base,
  checkProgress: ({ account, events, participant }) => {
    const kills = getAllKills(events);
    const deathMarks = kills.filter((kill) => {
      if (kill.killerId !== participant.participantId) {
        return false;
      }

      const deathInsideCooldown = kills.find(
        (death) =>
          death.victimId === participant.participantId &&
          death.timestamp >= kill.timestamp &&
          death.timestamp < kill.timestamp + REQUIRED_SECONDS * 1000
      );
      return deathInsideCooldown;
    });

    const trophyProgress = getTrophyProgress(account, 'deathMarks');
    return deathMarks.length / 7 + trophyProgress;
  },
};

export default deathMarks;
