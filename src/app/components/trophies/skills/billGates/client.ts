import { TrophyClient } from '../../types';
import base from './base';

const billGates: TrophyClient = {
  ...base,
  checkLive: ({ activePlayer }) => {
    if (!activePlayer) {
      return 0;
    }

    return activePlayer.currentGold / 20000;
  },
};

export default billGates;
