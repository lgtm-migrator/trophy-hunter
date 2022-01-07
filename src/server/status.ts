import { Request, Response } from 'express';
import { getJSON } from '../app/lib//utils/request';
import {
  LOL_ID,
  LEAGUE_LAUNCHER_ID,
  INTERESTED_IN_LAUNCHER_FEATURES,
} from '../app/lib/overwolf/constants';

type State = 0 | 1 | 2 | 3;

interface EventStatus {
  game_id: number;
  state: State;
  features: {
    name: string;
    state: State;
    keys: {
      name: string;
      type: number;
      state: State;
      is_index: boolean;
      category?: string;
      sample_data: null | string;
    }[];
  }[];
}

const cachedEventStatus = {
  [LOL_ID]: {
    timestamp: 0,
    promise: null,
  },
  [LEAGUE_LAUNCHER_ID]: {
    timestamp: 0,
    promise: null,
  },
};
const getEventStatus = async (gameId: number): Promise<EventStatus> => {
  const cache = cachedEventStatus[gameId];
  if (cache.timestamp < Date.now() - 1000 * 60) {
    cache.promise = getJSON<EventStatus>(
      `https://game-events-status.overwolf.com/${gameId}_prod.json`
    );
    cache.timestamp = Date.now();
  }
  const eventStatus = await cache.promise;
  return eventStatus;
};

export const handleGetStatus = async (_req: Request, res: Response) => {
  const [leagueStatus, launcherStatus] = await Promise.all([
    getEventStatus(LOL_ID),
    getEventStatus(LEAGUE_LAUNCHER_ID),
  ]);
  const issues = [];
  const matchState = leagueStatus.features.find(
    (feature) => feature.name === 'matchState'
  );
  if (matchState) {
    const matchId = matchState.keys.find((key) => key.name === 'matchId');
    if (matchId && matchId.state !== 1) {
      issues.push('matchId');
    }
  }

  const launcherIssues = launcherStatus.features.filter(
    (feature) =>
      INTERESTED_IN_LAUNCHER_FEATURES.includes(feature.name) &&
      feature.state !== 1
  );

  if (launcherIssues.length > 0) {
    issues.push('launcher');
  }
  res.setHeader('Cache-Control', 'max-age=180');
  res.json(issues);
};
