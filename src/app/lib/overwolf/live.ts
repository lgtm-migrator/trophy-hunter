import { openWindow, setLeagueFeatures } from '.';
import { INTERESTED_IN_LEAGUE_FEATURES, LEAGUE_LAUNCHER_ID } from './constants';
import { Live, TrophyClient } from '../../components/trophies/types';
import { Account } from '../accounts';
import { error, log } from '../logs';
import { waitFor } from '../utils/async';
import { parseJSON } from '../utils/json';
import {
  getLocalStorageItem,
  setLocalStorageItem,
  unsetLocalStorageItem,
} from '../utils/storage';
import levels from '../../components/islands/client';
import { LevelClient } from '../../components/levels/types';
import { ARAM_HOWLING_ABYSS, SUPPORTED_QUEUE_IDS } from '../riot/queues';

export const PROGRESS = 'PROGRESS';
export const LIVE = 'LIVE';
export const TROPHY_PROGRESS = 'TROPHY_PROGRESS';

let activeTrophies: TrophyClient[] = null;
let live: Live = {
  activePlayer: null,
  allPlayers: null,
  events: null,
  gameData: null,
  trophyData: {},
  account: null,
  matchId: null,
  queueId: null,
};
let notifiedNear: string[] = [];
let notifiedCompleted: string[] = [];

const resetStates = () => {
  unsetLocalStorageItem(PROGRESS);
  unsetLocalStorageItem(LIVE);
  unsetLocalStorageItem(TROPHY_PROGRESS);
  unsetLocalStorageItem('notifications');

  activeTrophies = null;
  live = {
    activePlayer: null,
    allPlayers: null,
    events: null,
    gameData: null,
    trophyData: {},
    account: null,
    matchId: null,
    queueId: null,
  };
  notifiedNear = [];
  notifiedCompleted = [];
};
resetStates();

const setTrophyProgress = (account: Account) => {
  if (activeTrophies.length === 0) {
    return;
  }

  const trophiesProgress = activeTrophies.map((trophy) => {
    try {
      if (notifiedCompleted.includes(trophy.name)) {
        return {
          trophyName: trophy.name,
          progress: 1,
        };
      }
      const liveProgress = trophy.checkLive?.(live);
      const accountProgress = account.trophies.find(
        (accountTrophy) => accountTrophy.name === trophy.name
      )?.progress;

      return {
        trophyName: trophy.name,
        progress: Math.min(1, liveProgress || accountProgress || 0),
      };
    } catch (err) {
      error(`checkLive error in ${trophy.name}: ${err.message}`, err.stack);
      return {
        trophyName: trophy.name,
        progress: 0,
      };
    }
  });

  const progressByTrophyName = trophiesProgress.reduce<{
    [trophyName: string]: number;
  }>(
    (acc, cur) => ({
      ...acc,
      [cur.trophyName]: cur.progress,
    }),
    {}
  );

  setLocalStorageItem(TROPHY_PROGRESS, progressByTrophyName);

  const showTrophyNearCompletion = getLocalStorageItem(
    'trophyNearCompletion',
    true
  );
  const showTrophyCompleted = getLocalStorageItem('trophyCompleted', true);

  const nearCompletedTrophies = showTrophyNearCompletion
    ? trophiesProgress.filter(
        (trophyProgress) =>
          trophyProgress.progress >= 0.8 &&
          trophyProgress.progress < 1 &&
          !notifiedNear.includes(trophyProgress.trophyName)
      )
    : [];
  nearCompletedTrophies.forEach((nearCompletedTrophy) => {
    notifiedNear.push(nearCompletedTrophy.trophyName);
  });

  const completedTrophies = showTrophyCompleted
    ? trophiesProgress.filter(
        (trophyProgress) =>
          trophyProgress.progress >= 1 &&
          !notifiedCompleted.includes(trophyProgress.trophyName)
      )
    : [];
  completedTrophies.forEach((completedTrophy) => {
    notifiedCompleted.push(completedTrophy.trophyName);
  });

  const notificateTrophies = [...nearCompletedTrophies, ...completedTrophies];
  if (notificateTrophies.length === 0) {
    return;
  }

  const notifications = getLocalStorageItem('notifications', []).filter(
    (notification) =>
      !notificateTrophies.find(
        (notificateTrophy) =>
          notificateTrophy.trophyName === notification.trophyName
      )
  );

  const newNotifications = [...notifications, ...notificateTrophies];
  setLocalStorageItem('notifications', newNotifications);
  log('Notificate trophies', newNotifications);

  openWindow('notification');
};

const handleLiveClientData = (liveClientData: {
  active_player?: string;
  all_players?: string;
  events?: string;
  game_data?: string;
}) => {
  try {
    const activePlayer = parseJSON(liveClientData.active_player);
    if (activePlayer) {
      live.activePlayer = activePlayer;
    }
    const allPlayers = parseJSON(liveClientData.all_players);
    if (allPlayers) {
      live.allPlayers = allPlayers;
    }
    const events = parseJSON(liveClientData.events) || {};
    if (events?.Events) {
      live.events = events.Events;
    }
    const gameData = parseJSON(liveClientData.game_data);
    if (gameData) {
      const isNewGameTime = gameData.gameTime !== live.gameData?.gameTime;
      live.gameData = gameData;
      if (
        isNewGameTime &&
        live.gameData?.gameTime &&
        live.activePlayer &&
        live.allPlayers &&
        live.events &&
        live.account &&
        live.trophyData
      ) {
        setLocalStorageItem(LIVE, live);
        if (!activeTrophies) {
          activeTrophies = getActiveTrophies(live.queueId);
          log(
            `Can achieve ${activeTrophies.length} trophies`,
            activeTrophies.map((trophy) => trophy.name)
          );
        }
        setTrophyProgress(live.account);
      }
    }
  } catch (e) {
    console.error(e);
    error('[handleInfoUpdates2]', e.message);
  }
};

const handleGameInfo = (gameInfo: { matchId?: string }) => {
  if (gameInfo.matchId) {
    live.matchId = gameInfo.matchId;
  }
};

const handleInfoUpdates2 = (
  infoUpdate: overwolf.games.events.InfoUpdates2Event
) => {
  if (infoUpdate.feature === 'live_client_data') {
    handleLiveClientData(infoUpdate.info.live_client_data);
  }
  if (infoUpdate.feature === 'matchState') {
    handleGameInfo(infoUpdate.info.game_info);
  }
};

const getActiveTrophies = (queueId: number) => {
  const activeLevels = live.account.levels.filter(
    (level) => level.status === 'active'
  );
  if (activeLevels.length === 0) {
    log('[getActiveTrophies] no active levels', live.account.levels);
    return [];
  }
  return activeLevels.reduce<TrophyClient[]>((trophies, accountLevel) => {
    const level = levels[accountLevel.name] as LevelClient;
    return [
      ...trophies,
      ...level.trophies.filter((trophy) => {
        const accountTrophy = live.account.trophies.find(
          (accountTrophy) => accountTrophy.name === trophy.name
        );
        if (queueId === ARAM_HOWLING_ABYSS) {
          return accountTrophy?.status !== 'completed' && trophy.aramSupport;
        }
        return accountTrophy?.status !== 'completed';
      }),
    ];
  }, []);
};

export const runLiveCheck = async (
  account: Account,
  queueId: number
): Promise<void> => {
  try {
    log('Run live check');
    setLocalStorageItem(PROGRESS, 0);
    resetStates();
    live.account = account;
    live.queueId = queueId;
    setLocalStorageItem(PROGRESS, 0.5);
    await waitFor(1000);
    await setLeagueFeatures(INTERESTED_IN_LEAGUE_FEATURES);
    setLocalStorageItem(PROGRESS, 1);
    overwolf.games.events.getInfo((event) => {
      if (event.res.live_client_data) {
        handleLiveClientData(event.res.live_client_data);
      }
      if (event.res.game_info) {
        handleGameInfo(event.res.game_info);
      }
    });
    overwolf.games.events.onInfoUpdates2.addListener(handleInfoUpdates2);
  } catch (err) {
    error(`[runLiveCheck] ${err.message}`, err.stack);
  }
};

export const stopLiveCheck = (): void => {
  overwolf.games.events.onInfoUpdates2.removeListener(handleInfoUpdates2);
};

export const isPlayingSupportedGame = async (): Promise<false | number> => {
  return new Promise((resolve) => {
    let launcherInfoTimeoutId = null;
    const getLauncherInfo = (hideError = false) => {
      overwolf.games.launchers.events.getInfo(LEAGUE_LAUNCHER_ID, (info) => {
        if (info.reason || info.status === 'error' || !info.res) {
          if (!hideError) {
            error('[launchers getInfo]', info);
          }
          clearTimeout(launcherInfoTimeoutId);
          launcherInfoTimeoutId = setTimeout(() => getLauncherInfo(true), 5000);
          return;
        }

        const { lobby_info: lobbyInfo, game_flow: gameFlow } = info.res;
        if (!gameFlow || !lobbyInfo) {
          log(`[getInfo] gameFlow or lobbyInfo is no set`);
          return resolve(false);
        }

        if (gameFlow.phase !== 'InProgress' && gameFlow.phase !== 'GameStart') {
          log(`[getInfo] gameFlow.phase is ${gameFlow.phase}`);
          resolve(false);
        } else if (lobbyInfo?.queueId) {
          const queueId = parseInt(info.res.lobby_info.queueId);
          if (isNaN(queueId)) {
            log(
              `[getInfo] QueueId is NaN: ${JSON.stringify(info.res.lobby_info)}`
            );
            return;
          }
          if (!SUPPORTED_QUEUE_IDS.includes(queueId)) {
            log(`[getInfo] QueueId ${queueId} is not supported`);
            resolve(false);
          } else {
            resolve(queueId);
          }
        }
      });
    };
    getLauncherInfo();
  });
};
