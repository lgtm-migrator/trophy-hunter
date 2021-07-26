import { TrophyServer } from '../../types';
import base from './base';

const greyEminence: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxAssists = Math.max(
      ...match.participants.map((participant) => participant.stats.assists)
    );
    const minDeaths = Math.min(
      ...match.participants.map((participant) => participant.stats.deaths)
    );

    return Number(
      participant.stats.assists >= maxAssists &&
        participant.stats.deaths <= minDeaths
    );
  },
};

export default greyEminence;
