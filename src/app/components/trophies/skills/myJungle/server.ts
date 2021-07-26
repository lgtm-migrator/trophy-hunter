import { TrophyServer } from '../../types';
import base from './base';

const myJungle: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxEnemyJungleCsOthers = Math.max(
      ...match.participants.map((participant) => participant.stats.kills)
    );
    const maxTeamJungleCsOthers = Math.max(
      ...match.participants.map(
        (participant) => participant.stats.neutralMinionsKilledTeamJungle
      )
    );

    return Number(
      participant.stats.neutralMinionsKilledEnemyJungle >=
        maxEnemyJungleCsOthers &&
        participant.stats.neutralMinionsKilledTeamJungle >=
          maxTeamJungleCsOthers
    );
  },
};

export default myJungle;
