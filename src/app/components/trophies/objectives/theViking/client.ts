import { TrophyClient } from '../../types';
import base, { REQUIRED_MINUTES } from './base';
import { minutesToSeconds } from '../../../../lib/utils/dates';

const theViking: TrophyClient = {
  ...base,
  checkLive: ({ events, gameData, account, trophyData }) => {
    if (
      !events.length ||
      gameData.gameTime >= minutesToSeconds(REQUIRED_MINUTES) ||
      trophyData.theViking
    ) {
      return 0;
    }

    const hasSoloKill = events.find(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.KillerName === account.summoner.name &&
        event.Assisters.length === 0
    );

    const firstTowerKilled = events
      .filter((event) => event.EventName === 'TurretKilled')
      .sort((a, b) => a.EventTime - b.EventTime)[0];
    const firstTowerParticipation =
      firstTowerKilled?.KillerName === account.summoner.name ||
      firstTowerKilled?.Assisters.includes(account.summoner.name);

    if (!hasSoloKill && !firstTowerParticipation) {
      return 0;
    }
    if (
      (hasSoloKill && !firstTowerParticipation) ||
      (!hasSoloKill && firstTowerParticipation)
    ) {
      return 0.5;
    }
    trophyData.theViking = true;
    return 1;
  },
};

export default theViking;
