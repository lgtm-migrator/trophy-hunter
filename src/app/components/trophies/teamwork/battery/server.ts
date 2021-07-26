import { TrophyServer } from '../../types';
import base from './base';

const battery: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxTotalHeal = Math.max(
      ...match.participants.map((other) => other.stats.totalHeal)
    );
    const maxTotalDamageTaken = Math.max(
      ...match.participants.map((other) => other.stats.totalDamageTaken)
    );

    return Number(
      participant.stats.totalHeal >= maxTotalHeal &&
        participant.stats.totalDamageTaken >= maxTotalDamageTaken
    );
  },
};

export default battery;
