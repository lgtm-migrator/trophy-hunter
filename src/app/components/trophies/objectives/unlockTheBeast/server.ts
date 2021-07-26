import { TrophyServer } from '../../types';
import base from './base';
import { getTeam, getParticipantKills } from '../../../../lib/riot/helpers';

const unlockTheBeast: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant }) => {
    const teamIds = getTeam(match, participant.teamId).map(
      (teammate) => teammate.participantId
    );

    const baronKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterType === 'BARON_NASHOR' &&
        teamIds.includes(event.killerId)
    );
    const kills = getParticipantKills(events, participant.participantId);
    const participantKillsBeforeBaron = baronKills.map((baron) =>
      kills.filter(
        (kill) =>
          baron.timestamp > kill.timestamp &&
          baron.timestamp <= kill.timestamp + 40000
      )
    );

    const unlockTheBeastScore = Math.max(
      ...participantKillsBeforeBaron.map((kills) => kills.length),
      0
    );

    return unlockTheBeastScore / 2;
  },
};

export default unlockTheBeast;
