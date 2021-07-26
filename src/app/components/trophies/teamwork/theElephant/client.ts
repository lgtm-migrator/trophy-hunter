import { TrophyClient } from '../../types';
import base, { ARAM_MINUTES, SUMMONERS_RIFT_MINUTES } from './base';
import { minutesToSeconds } from '../../../../lib/utils/dates';

const theElephant: TrophyClient = {
  ...base,
  checkLive: ({ events, gameData, account }) => {
    const deaths = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.VictimName === account.summoner.name
    );
    const requiredTimelimit =
      gameData.gameMode === 'ARAM'
        ? minutesToSeconds(ARAM_MINUTES)
        : minutesToSeconds(SUMMONERS_RIFT_MINUTES);
    const lastDeath = deaths[deaths.length - 1];
    if (!lastDeath) {
      return gameData.gameTime / requiredTimelimit;
    }
    return (gameData.gameTime - lastDeath.EventTime) / requiredTimelimit;
  },
};

export default theElephant;
