import { TrophyServer } from '../../types';
import base from './base';

const visionGame: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return Number(
      participant.stats.visionWardsBoughtInGame >= 4 &&
        participant.stats.wardsPlaced >= 20 &&
        participant.stats.wardsKilled >= 4
    );
  },
};

export default visionGame;
