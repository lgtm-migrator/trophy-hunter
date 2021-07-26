import { TrophyServer } from '../../types';
import base from './base';

const sniper: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxTotalDamageDealtToChampions = Math.max(
      ...match.participants.map(
        (participant) => participant.stats.totalDamageDealtToChampions
      )
    );
    const minTotalDamageTaken = Math.min(
      ...match.participants.map(
        (participant) => participant.stats.totalDamageTaken
      )
    );

    return Number(
      participant.stats.totalDamageDealtToChampions >=
        maxTotalDamageDealtToChampions &&
        participant.stats.totalDamageTaken === minTotalDamageTaken
    );
  },
};

export default sniper;
