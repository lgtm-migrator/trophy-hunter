import { TrophyServer } from '../../types';
import base from './base';

const deadlyShadow: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxKills = Math.max(
      ...match.participants.map((participant) => participant.stats.kills)
    );
    const minTotalDamageTaken = Math.min(
      ...match.participants.map(
        (participant) => participant.stats.totalDamageTaken
      )
    );

    return Number(
      participant.stats.kills >= maxKills &&
        participant.stats.totalDamageTaken === minTotalDamageTaken
    );
  },
};

export default deadlyShadow;
