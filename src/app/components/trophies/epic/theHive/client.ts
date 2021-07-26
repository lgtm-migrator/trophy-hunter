import { TrophyClient } from '../../types';
import base from './base';

const theHive: TrophyClient = {
  ...base,
  checkLive: ({ events, account, gameData }) => {
    const hiveKills = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.Assisters.some(
          (assister) => assister === account.summoner.name
        ) &&
        event.Assisters.length >= 4
    );
    if (gameData.gameMode === 'ARAM') {
      return hiveKills.length / 12;
    }
    const victimNames = hiveKills.map((event) => event.VictimName);
    const uniqueVictims = victimNames.filter(
      (victimName, index, current) => current.indexOf(victimName) === index
    ).length;
    return uniqueVictims / 5;
  },
};

export default theHive;
