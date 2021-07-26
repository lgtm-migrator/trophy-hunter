import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const theGoblin: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant, account }) => {
    const maxEnemyJungleCsOthers = Math.max(
      ...match.participants.map((participant) => participant.stats.kills)
    );
    const maxTeamJungleCsOthers = Math.max(
      ...match.participants.map(
        (participant) => participant.stats.neutralMinionsKilledTeamJungle
      )
    );
    const mostJungleCS =
      participant.stats.neutralMinionsKilledEnemyJungle >=
        maxEnemyJungleCsOthers &&
      participant.stats.neutralMinionsKilledTeamJungle >= maxTeamJungleCsOthers;
    if (!mostJungleCS) {
      return 0;
    }
    const trophyProgress = getTrophyProgress(account, 'theGoblin');
    return Number(mostJungleCS) / 3 + trophyProgress;
  },
};

export default theGoblin;
