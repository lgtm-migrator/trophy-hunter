import { TrophyClient } from '../../types';
import base from './base';

const fertilizer: TrophyClient = {
  ...base,
  checkLive: ({ activePlayer, gameData }) => {
    if (gameData.gameMode === 'ARAM') {
      if (gameData.gameTime > 12 * 60) {
        return 0;
      }
    } else {
      if (gameData.gameTime > 15 * 60) {
        return 0;
      }
    }

    return activePlayer.level / 10;
  },
};

export default fertilizer;
