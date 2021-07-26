import { TrophyClient } from '../../types';
import base from './base';

const theTortoise: TrophyClient = {
  ...base,
  checkLive: ({ events, gameData, account }) => {
    const requiredTimelimit = gameData.gameMode === 'ARAM' ? 1200 : 1800;

    const deaths = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.VictimName === account.summoner.name
    );

    const lastDeath = deaths[deaths.length - 1];
    if (!lastDeath) {
      return gameData.gameTime / requiredTimelimit;
    }
    return (gameData.gameTime - lastDeath.EventTime) / requiredTimelimit;
  },
};

export default theTortoise;
