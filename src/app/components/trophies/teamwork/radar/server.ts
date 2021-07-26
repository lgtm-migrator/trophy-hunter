import { TrophyServer } from '../../types';
import base from './base';

const radar: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxWardsPlaced = Math.max(
      ...match.participants.map((participant) => participant.stats.wardsPlaced)
    );
    const maxWardsKilled = Math.max(
      ...match.participants.map((participant) => participant.stats.wardsKilled)
    );
    const maxVisionWardsBoughtInGame = Math.max(
      ...match.participants.map(
        (participant) => participant.stats.visionWardsBoughtInGame
      )
    );

    return Number(
      participant.stats.wardsPlaced >= maxWardsPlaced &&
        participant.stats.wardsKilled >= maxWardsKilled &&
        participant.stats.visionWardsBoughtInGame >= maxVisionWardsBoughtInGame
    );
  },
};

export default radar;
