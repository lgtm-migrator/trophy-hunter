import { TrophyServer } from '../../types';
import base from './base';

const killerInstinct: TrophyServer = {
  ...base,
  checkProgress: ({ participant, match }) => {
    const maxKills = Math.max(
      ...match.participants.map((participant) => participant.stats.kills)
    );

    return Number(participant.stats.kills >= maxKills);
  },
};

export default killerInstinct;
