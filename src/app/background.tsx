import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import overwolf, {
  isLeagueLaunched,
  isLeagueRunning,
  openWindow,
  setLeagueLauncherFeatures,
  isLeagueLauncherRunning,
  isLeagueClosed,
  closeWindow,
  getAppVersion,
  toggleInGameWindow,
} from './lib/overwolf';
import { postLogin } from './lib/accounts';
import { useState, useEffect } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import usePersistentState from './hooks/usePersistentState';
import { log } from './lib/logs';
import {
  isPlayingSupportedGame,
  LIVE,
  runLiveCheck,
  stopLiveCheck,
} from './lib/overwolf/live';
import { useAccount } from './contexts/account';
import { getLocalStorageItem } from './lib/utils/storage';
import App from './App';
import {
  INTERESTED_IN_LAUNCHER_FEATURES,
  LEAGUE_LAUNCHER_ID,
} from './lib/overwolf/constants';

getAppVersion().then((version) => log(`Running ${version}`));

const Background = () => {
  const [leagueRunning, setLeagueRunning] = useState<boolean | null>(null);
  const [leagueLauncherRunning, setLeagueLauncherRunning] = useState<
    boolean | null
  >(null);
  const [registeredFeatures, setRegisteredFeatures] = useState(false);
  const [autoLaunch] = usePersistentState('autoLaunch', true);
  const { account } = useAccount();
  const queryClient = useQueryClient();

  const { mutate: login } = useMutation(postLogin, {
    onSuccess: () => {
      queryClient.invalidateQueries('account');
    },
  });

  useEffect(() => {
    const handleHotkeyPressed = async (
      event: overwolf.settings.hotkeys.OnPressedEvent
    ) => {
      if (event.name === 'show_trophy_hunter') {
        const playingSupportedGame = await isPlayingSupportedGame();
        if (!playingSupportedGame) {
          log('Not playing a supported game');
          openWindow('not_supported');
          return;
        }
        toggleInGameWindow();
      }
    };

    overwolf.settings.hotkeys.onPressed.addListener(handleHotkeyPressed);

    return () => {
      overwolf.settings.hotkeys.onPressed.removeListener(handleHotkeyPressed);
    };
  }, []);

  useEffect(() => {
    const launchedByEvent = globalThis.location?.search.includes(
      'source=gamelaunchevent'
    );
    if (!launchedByEvent) {
      log('Not launched by event => open Desktop window');
      openWindow('desktop');
    }

    const handleLauncherLaunched = (
      launcher: overwolf.games.launchers.LauncherInfo
    ) => {
      if (Math.floor(launcher.id / 10) === LEAGUE_LAUNCHER_ID) {
        setLeagueLauncherRunning(true);
      }
    };

    const handleLauncherTerminated = (
      launcher: overwolf.games.launchers.LauncherInfo
    ) => {
      if (Math.floor(launcher.id / 10) === LEAGUE_LAUNCHER_ID) {
        setLeagueLauncherRunning(false);
      }
    };

    overwolf.games.launchers.onLaunched.addListener(handleLauncherLaunched);
    overwolf.games.launchers.onTerminated.addListener(handleLauncherTerminated);

    overwolf.games.launchers.getRunningLaunchersInfo((res) => {
      if (res.success) {
        setLeagueLauncherRunning(isLeagueLauncherRunning(res.launchers));
      }
    });

    const handleGameInfoUpdated = (
      res: overwolf.games.GameInfoUpdatedEvent
    ) => {
      if (isLeagueLaunched(res)) {
        setLeagueRunning(true);
      } else if (isLeagueClosed(res)) {
        setLeagueRunning(false);
      }
    };
    overwolf.games.onGameInfoUpdated.addListener(handleGameInfoUpdated);

    overwolf.games.getRunningGameInfo((res) => {
      setLeagueRunning(isLeagueRunning(res));
    });

    const handleAppLaunch = () => {
      overwolf.games.getRunningGameInfo(async (res) => {
        const leagueIsRunning = isLeagueRunning(res);
        setLeagueRunning(leagueIsRunning);

        if (leagueIsRunning && res.isInFocus) {
          const playingSupportedGame = await isPlayingSupportedGame();
          if (playingSupportedGame) {
            log(`Playing a supported game ${playingSupportedGame}`);
            toggleInGameWindow(true);
            runLiveCheck(account, playingSupportedGame);
          } else {
            log(`Not playing a supported game ${playingSupportedGame}`);
            openWindow('not_supported');
          }
        } else {
          openWindow('desktop');
        }
      });
    };

    overwolf.extensions.onAppLaunchTriggered.addListener(handleAppLaunch);

    return () => {
      overwolf.games.onGameInfoUpdated.removeListener(handleGameInfoUpdated);
      overwolf.extensions.onAppLaunchTriggered.removeListener(handleAppLaunch);
      overwolf.games.launchers.onLaunched.removeListener(
        handleLauncherLaunched
      );
      overwolf.games.launchers.onTerminated.removeListener(
        handleLauncherTerminated
      );
    };
  }, []);

  useEffect(() => {
    if (leagueLauncherRunning === null) {
      log(`League launcher is null`);
      return;
    }

    if (leagueLauncherRunning === false) {
      log(`League launcher is not running`);
      return;
    }
    log(`League launcher is running`);
    if (autoLaunch) {
      openWindow('desktop');
    }

    const timeoutId = setTimeout(() => {
      setLeagueLauncherFeatures(INTERESTED_IN_LAUNCHER_FEATURES, () => {
        let summonerNotFound = false;
        const getSummonerInfo = () => {
          overwolf.games.launchers.events.getInfo(
            LEAGUE_LAUNCHER_ID,
            (response) => {
              if (response?.res?.summoner_info) {
                const {
                  platform_id: platformId,
                  display_name: summonerName,
                  is_garena_user: isGarenaUser,
                } = response.res.summoner_info;
                if (!summonerName || !platformId) {
                  if (!summonerNotFound) {
                    console.error(
                      `SummonerName not found ${JSON.stringify(
                        response.res.summoner_info
                      )}`
                    );
                    summonerNotFound = true;
                  }
                  setTimeout(getSummonerInfo, 1000);
                } else if (isGarenaUser === 'true' || isGarenaUser === true) {
                  console.info(
                    `User ${summonerName} ${platformId} is a garena user`
                  );
                  localStorage.setItem('isGarenaUser', 'true');
                  setRegisteredFeatures(true);
                } else {
                  localStorage.removeItem('isGarenaUser');
                  log(`Login as ${summonerName} on ${platformId}`);
                  login({ platformId, summonerName });
                  setRegisteredFeatures(true);
                }
              } else {
                log('[getSummonerInfo] not found', response);
                setTimeout(getSummonerInfo, 2000);
              }
            }
          );
        };

        getSummonerInfo();
      });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [leagueLauncherRunning, autoLaunch]);

  useEffect(() => {
    if (!account || !registeredFeatures) {
      return;
    }
    if (leagueRunning === false) {
      log('League is not running');

      closeWindow('in_game');
      closeWindow('second_screen');

      const live = getLocalStorageItem(LIVE, null);
      if (
        live?.matchId &&
        localStorage.getItem('checkGameId') !== live.matchId
      ) {
        log(`Check game ${live.matchId}`);
        localStorage.setItem('checkGameId', live.matchId);
        openWindow('desktop');
      }

      return;
    }

    if (leagueRunning) {
      log('League is running');
      isPlayingSupportedGame().then((playingSupportedGame) => {
        if (playingSupportedGame) {
          log(`Playing a supported game ${playingSupportedGame}`);
          runLiveCheck(account, playingSupportedGame);
          if (autoLaunch) {
            toggleInGameWindow(true);
          }
        } else {
          log(`Not playing a supported game ${playingSupportedGame}`);
          if (autoLaunch) {
            openWindow('not_supported');
          }
        }
      });
      return stopLiveCheck;
    }
  }, [leagueRunning, registeredFeatures, autoLaunch, account?._id]);

  return <></>;
};

ReactDOM.render(
  <StrictMode>
    <App>
      <Background />
    </App>
  </StrictMode>,
  document.querySelector('#root')
);
