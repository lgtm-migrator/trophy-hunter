import { TrophyClient } from '../../types';
import base from './base';

const hextechLord: TrophyClient = {
  ...base,
  checkLive: ({ activePlayer }) => {
    if (!activePlayer) {
      return 0;
    }

    return activePlayer.currentGold / 15000;
  },
};

export default hextechLord;
