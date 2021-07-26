import { TrophyServer } from '../../types';
import base from './base';
import { getParticipantKillsAndAssists } from '../../../../lib/riot/helpers';

const neutralizer: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant }) => {
    const opponentTeamIds = match.participants
      .filter((other) => other.teamId !== participant.teamId)
      .map((other) => other.participantId);

    const killsAndAssists = getParticipantKillsAndAssists(
      events,
      participant.participantId
    );

    const opponentBaronKills = events.filter(
      (event) =>
        event.monsterType === 'BARON_NASHOR' &&
        opponentTeamIds.includes(event.killerId)
    );

    const baronClearParticipations = killsAndAssists.filter((kill) =>
      opponentBaronKills.some(
        (baronKill) =>
          baronKill.timestamp < kill.timestamp &&
          kill.timestamp < baronKill.timestamp + 210000
      )
    ).length;

    return baronClearParticipations / 3;
  },
};

export default neutralizer;
