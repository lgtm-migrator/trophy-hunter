import { TrophyServer } from '../../types';
import base from './base';

const theGriffin: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxKillParticipation = Math.max(
      ...match.participants.map(
        (participant) => participant.stats.kills + participant.stats.assists
      )
    );
    return Number(
      participant.stats.assists + participant.stats.kills >=
        maxKillParticipation
    );
  },
};

export default theGriffin;
