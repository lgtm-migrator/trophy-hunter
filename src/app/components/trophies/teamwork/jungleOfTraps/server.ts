import { TrophyServer } from '../../types';
import base from './base';

const jungleOfTraps: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const team = match.teams.find((team) => team.teamId === participant.teamId);

    return Number(
      participant.stats.visionWardsBoughtInGame >= 4 &&
        participant.stats.wardsKilled >= 4 &&
        participant.stats.killingSprees >= 1 &&
        team.dragonKills >= 2
    );
  },
};

export default jungleOfTraps;
