import { TrophyServer } from '../../types';
import base from './base';
import { getParticipantKillsAndAssists } from '../../../../lib/riot/helpers';

const zenithBlade: TrophyServer = {
  ...base,
  checkProgress: ({ participant, events }) => {
    const killsAndAssists = getParticipantKillsAndAssists(
      events,
      participant.participantId
    );

    const zenithBladeKills = killsAndAssists.filter((kill) => {
      const isEarlyEnough = kill.timestamp <= 4 * 60 * 1000;
      const isLateEnough = kill.timestamp >= 2 * 60 * 1000;
      return isLateEnough && isEarlyEnough;
    }).length;
    return zenithBladeKills;
  },
};

export default zenithBlade;
