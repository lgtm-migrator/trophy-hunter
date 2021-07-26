import { TrophyServer } from '../../types';
import base from './base';

const octopus: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxAssists = Math.max(
      ...match.participants.map((other) => other.stats.assists)
    );

    return Number(participant.stats.assists >= maxAssists);
  },
};

export default octopus;
