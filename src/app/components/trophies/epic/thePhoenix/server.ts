import { TrophyServer } from '../../types';
import base from './base';

const thePhoenix: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const opponentTeam = match.teams.find(
      (team) => team.teamId !== participant.teamId
    );

    return Number(participant.stats.win && opponentTeam.inhibitorKills >= 3);
  },
};

export default thePhoenix;
