import { TrophyClient } from '../../types';
import base from './base';

const sinisterBlades: TrophyClient = {
  ...base,
  checkLive: ({ events, account, gameData }) => {
    const multikills = events.filter(
      (event) =>
        event.EventName === 'Multikill' &&
        event.KillerName === account.summoner.name
    ).length;
    const requiredDoubleKills = gameData.gameMode === 'ARAM' ? 7 : 4;
    return multikills / requiredDoubleKills;
  },
};

export default sinisterBlades;
