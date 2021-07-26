import { TrophyServer } from '../../types';
import base from './base';
import {
  getParticipantKills,
  getTeammates,
} from '../../../../lib/riot/helpers';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const vengeance: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant, account }) => {
    const teammateIds = getTeammates(match, participant).map(
      (teammate) => teammate.participantId
    );

    const teammateDeaths = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' && teammateIds.includes(event.victimId)
    );

    const kills = getParticipantKills(events, participant.participantId);

    const vengeanceKills = teammateDeaths.filter((teammateDeath) =>
      kills.find((kill) => {
        const isVicKillBeforeKill = teammateDeath.timestamp < kill.timestamp;
        const isVicKillAtMost10SBefore =
          teammateDeath.timestamp + 10000 > kill.timestamp;
        return isVicKillBeforeKill && isVicKillAtMost10SBefore;
      })
    ).length;

    const trophyProgress = getTrophyProgress(account, 'vengeance');
    return vengeanceKills / 3 + trophyProgress;
  },
};

export default vengeance;
