import { TrophyServer } from '../../types';
import base from './base';

const sigurd: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const team = match.teams.find((team) => team.teamId === participant.teamId);

    return Number(
      team.firstDragon && team.baronKills >= 1 && team.dragonKills >= 5
    );
  },
};

export default sigurd;
