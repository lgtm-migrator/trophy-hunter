import { TrophyClient } from '../../types';
import base from './base';

const theCannon: TrophyClient = {
  ...base,
  checkLive: ({ events, account, gameData }) => {
    const firstTurretDeath = events.find(
      (event) => event.EventName === 'TurretKilled'
    );
    if (!firstTurretDeath) {
      return 0;
    }
    const requiredMinutes = gameData.gameMode === 'ARAM' ? 5 : 10;
    const isEarly = firstTurretDeath.EventTime < requiredMinutes * 60;
    const isKiller = firstTurretDeath.KillerName === account.summoner.name;
    const isAssistant = firstTurretDeath.Assisters.some(
      (assister) => assister === account.summoner.name
    );
    return Number(isEarly && (isKiller || isAssistant));
  },
};

export default theCannon;
