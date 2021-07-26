import { TrophyServer } from '../../types';
import base from './base';

const glutton: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxKills = Math.max(
      ...match.participants.map((participant) => participant.stats.kills)
    );

    const maxTotalMinionsKilled = Math.max(
      ...match.participants.map(
        (participant) =>
          participant.stats.totalMinionsKilled +
          participant.stats.neutralMinionsKilled
      )
    );

    return Number(
      participant.stats.kills >= maxKills &&
        participant.stats.totalMinionsKilled +
          participant.stats.neutralMinionsKilled >=
          maxTotalMinionsKilled
    );
  },
};

export default glutton;
