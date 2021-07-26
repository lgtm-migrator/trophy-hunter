import { TrophyServer } from '../../types';
import base from './base';

const carryMode: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const team = match.teams.find((team) => team.teamId === participant.teamId);
    const teammates = match.participants.filter(
      (other) =>
        other.teamId === participant.teamId &&
        other.participantId !== participant.participantId
    );

    const teamKills = teammates
      .map((participant) => participant.stats.kills)
      .reduce((current, kills) => current + kills);
    return Number(
      participant.stats.kills > teamKills / 2 && team.win === 'Win'
    );
  },
};

export default carryMode;
