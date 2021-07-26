import { TrophyClient } from '../../types';
import base from './base';

const uncleScrooge: TrophyClient = {
  ...base,
  checkLive: ({ activePlayer }) => {
    return activePlayer.currentGold / 28000;
  },
};

export default uncleScrooge;
