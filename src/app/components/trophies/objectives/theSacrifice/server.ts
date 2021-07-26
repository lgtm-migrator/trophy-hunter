import { TrophyServer } from '../../types';
import base from './base';
import { getParticipantDeaths } from '../../../../lib/riot/helpers';

const theSacrifice: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const deaths = getParticipantDeaths(events, participant.participantId);

    const eliteMonsterKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.killerId === participant.participantId
    );
    const sacrificeScore = eliteMonsterKills.filter((eliteMonsterKill) => {
      const participantDieIn5SecsAfter = deaths.some(
        (death) =>
          death.timestamp > eliteMonsterKill.timestamp &&
          death.timestamp < eliteMonsterKill.timestamp + 5000
      );
      return participantDieIn5SecsAfter;
    }).length;

    return sacrificeScore;
  },
};

export default theSacrifice;
