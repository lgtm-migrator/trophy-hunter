import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import styled from '@emotion/styled';
import overwolf, {
  closeCurrentWindow,
  getCurrentWindow,
  getMonitor,
  getAppVersion,
  openWindow,
  WindowName,
} from './lib/overwolf';
import { log } from './lib/logs';
import { VideoAds } from './components/ads';
import Profile from './components/trophies/Profile';
import islands from './components/islands/islands';
import { useAccount } from './contexts/account';
import { useCallback, useEffect, useState } from 'react';
import useAvailableTrophies from './contexts/account/useAvailableTrophies';
import Combat from './components/filters/Combat';
import Skills from './components/filters/Skills';
import Teamwork from './components/filters/Teamwork';
import Objectives from './components/filters/Objectives';
import Special from './components/filters/Special';
import Epic from './components/filters/Epic';
import Origin from './components/filters/Origin';
import usePersistentState from './hooks/usePersistentState';
import { isPlayingSupportedGame, TROPHY_PROGRESS } from './lib/overwolf/live';
import TrophyListItem from './components/trophies/TrophyListItem';
import Status from './components/common/Status';
import Grow from './components/common/Grow';
import Hotkey from './components/headers/HotKey';
import useHotkey from './hooks/useHotkey';
import Header from './components/headers/Header';
import SizeButton from './components/headers/SizeButton';
import MinimizeButton from './components/headers/MinimizeButton';
import ExitButton from './components/headers/ExitButton';
import HeaderButton from './components/headers/HeaderButton';
import Monitor from './components/icons/Monitor';
import useDisplays from './hooks/useDisplays';
import useCenterWindow from './hooks/useCenterWindow';
import { SpecialGradients } from './components/levels/special';
import SearchingSquid from './components/icons/SearchingSquid';
import App from './App';
import { ARAM_HOWLING_ABYSS } from './lib/riot/queues';
import { i18n } from './lib/i18n/i18n';

getAppVersion().then((version) => log(`Running ${version}`));

const Container = styled.div`
  display: flex;
  height: 100vh;

  main {
    padding: 74px 20px 20px 20px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  aside {
    padding: 48px 20px 20px 20px;
    background: #1f1f1f;
    border-left: 1px solid #77777a;
    width: 440px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

const SmallIslands = styled.div`
  position: relative;
  margin-left: 12px;
  zoom: 0.48;
  pointer-events: none;
  margin-top: -4px;
  height: 640px;
`;

const List = styled.section`
  margin-top: 25px;
  overflow: auto;
  max-height: 100%;
  flex-grow: 1;

  > div {
    background-color: #3f3e43;
  }
`;

const Categories = styled.div`
  display: flex;
  margin-left: -18px;
  flex-wrap: wrap;
  margin-top: -18px;

  > * {
    margin-left: 18px;
    margin-top: 18px;
  }
`;

const Center = styled.div`
  display: grid;
  place-content: center;
  place-items: center;
  flex: 1;

  p {
    margin-top: 20px;
    font-size: 18px;
    text-transform: uppercase;
  }
`;

const allFilters = [...islands.map((island) => island.name)];
const SecondScreen = () => {
  const { account } = useAccount();
  const [filterIndex, setFilterIndex] = usePersistentState(
    'last-filter-index',
    -1
  );
  const [preferedWindow, setPreferedWindow] = usePersistentState<WindowName>(
    'prefered-window',
    'second_screen'
  );
  const levels = account?.levels || [];
  const availableTrophies = useAvailableTrophies(account);
  const [trophyProgress] = usePersistentState<{ [trophyName: string]: number }>(
    TROPHY_PROGRESS,
    {}
  );
  const nextPageHotkey = useHotkey('next_page_trophy_hunter');
  const showHideHotkey = useHotkey('show_trophy_hunter');
  const toggleMonitorHotkey = useHotkey('toggle_monitor_trophy_hunter');
  const [activeTrophies, setActiveTrophies] = useState([]);

  const displays = useDisplays();
  useCenterWindow();

  const filters = filterIndex === -1 ? [] : allFilters[filterIndex];

  const trophies = activeTrophies.filter((trophy) =>
    filters.includes(trophy.category)
  );

  const getNextIndex = useCallback(
    (index) => {
      let nextFilterIndex = (index + 1) % allFilters.length;
      while (nextFilterIndex < allFilters.length * 2) {
        const newFilterIndex = nextFilterIndex % allFilters.length;
        const hasItems = activeTrophies.some(
          (trophy) => trophy.category === allFilters[newFilterIndex]
        );
        if (hasItems) {
          return newFilterIndex;
        }
        nextFilterIndex++;
      }

      return index;
    },
    [activeTrophies]
  );

  useEffect(() => {
    if (!availableTrophies?.length) {
      return;
    }
    isPlayingSupportedGame().then((playingSupportedGame) => {
      if (playingSupportedGame) {
        setActiveTrophies(
          playingSupportedGame === ARAM_HOWLING_ABYSS
            ? availableTrophies.filter((trophy) => trophy.aramSupport)
            : availableTrophies
        );
      }
    });
  }, [availableTrophies]);

  useEffect(() => {
    const updateMonitorPosition = async () => {
      const monitor = await getMonitor(preferedWindow === 'in_game');
      const currentWindow = await getCurrentWindow();
      if (monitor && currentWindow.name !== preferedWindow) {
        await openWindow(preferedWindow);
        closeCurrentWindow();
      }
    };
    updateMonitorPosition();
  }, [preferedWindow]);

  useEffect(() => {
    if (filterIndex === -1) {
      setFilterIndex(getNextIndex(filterIndex));
    }
    const handleHotkeyPressed = (
      event: overwolf.settings.hotkeys.OnPressedEvent
    ) => {
      if (event.name === 'next_page_trophy_hunter') {
        setFilterIndex((filterIndex) => getNextIndex(filterIndex));
      } else if (event.name === 'toggle_monitor_trophy_hunter') {
        setPreferedWindow((gameWindow) =>
          gameWindow === 'in_game' ? 'second_screen' : 'in_game'
        );
      }
    };
    overwolf.settings.hotkeys.onPressed.addListener(handleHotkeyPressed);

    return () => {
      overwolf.settings.hotkeys.onPressed.removeListener(handleHotkeyPressed);
    };
  }, [filterIndex === -1, getNextIndex]);

  return (
    <Container>
      <Header resizable>
        <Status />
        <Grow />
        <Hotkey hint={i18n('Show/Hide')} value={showHideHotkey} />
        <Hotkey hint={i18n('Next Page')} value={nextPageHotkey} />
        {displays.length > 1 && (
          <Hotkey hint={i18n('Toggle monitor')} value={toggleMonitorHotkey} />
        )}
        <Grow />
        {displays.length > 1 && (
          <HeaderButton
            onClick={() =>
              setPreferedWindow(
                preferedWindow === 'in_game' ? 'second_screen' : 'in_game'
              )
            }
          >
            <Monitor />
          </HeaderButton>
        )}
        <MinimizeButton />
        <SizeButton />
        <ExitButton />
      </Header>
      <main>
        <Categories>
          <Combat
            selected={filterIndex === allFilters.indexOf('combat')}
            disabled={
              !activeTrophies.some((trophy) => trophy.category === 'combat')
            }
            onClick={() => setFilterIndex(allFilters.indexOf('combat'))}
          />
          <Skills
            selected={filterIndex === allFilters.indexOf('skills')}
            disabled={
              !activeTrophies.some((trophy) => trophy.category === 'skills')
            }
            onClick={() => setFilterIndex(allFilters.indexOf('skills'))}
          />
          <Teamwork
            selected={filterIndex === allFilters.indexOf('teamwork')}
            disabled={
              !activeTrophies.some((trophy) => trophy.category === 'teamwork')
            }
            onClick={() => setFilterIndex(allFilters.indexOf('teamwork'))}
          />
          <Objectives
            selected={filterIndex === allFilters.indexOf('objectives')}
            disabled={
              !activeTrophies.some((trophy) => trophy.category === 'objectives')
            }
            onClick={() => setFilterIndex(allFilters.indexOf('objectives'))}
          />
          <Special
            selected={filterIndex === allFilters.indexOf('special')}
            disabled={
              !activeTrophies.some((trophy) => trophy.category === 'special')
            }
            onClick={() => setFilterIndex(allFilters.indexOf('special'))}
          />
          <Epic
            selected={filterIndex === allFilters.indexOf('epic')}
            disabled={
              !activeTrophies.some((trophy) => trophy.category === 'epic')
            }
            onClick={() => setFilterIndex(allFilters.indexOf('epic'))}
          />
          <Origin
            selected={filterIndex === allFilters.indexOf('hub')}
            disabled={
              !activeTrophies.some((trophy) => trophy.category === 'hub')
            }
            onClick={() => setFilterIndex(allFilters.indexOf('hub'))}
          />
        </Categories>
        {trophies.length !== 0 && (
          <List>
            {trophies.map((trophy) => (
              <TrophyListItem
                account={account}
                trophy={trophy}
                key={trophy.name}
                borderless
                progress={trophyProgress ? trophyProgress[trophy.name] : 0}
              />
            ))}
          </List>
        )}
        {trophies.length === 0 && (
          <Center>
            <SearchingSquid />
            <p>{i18n('No trophies to show')}</p>
          </Center>
        )}
      </main>
      <aside>
        <Profile />
        <SpecialGradients />
        <SmallIslands>
          {islands.map(({ name, Component: Island }) => (
            <Island
              key={name}
              status={
                account?.islands.find(
                  (accountIsland) => accountIsland.name === name
                )?.status || 'closed'
              }
              levels={levels}
              onLevelClick={() => setFilterIndex(allFilters.indexOf(name))}
            />
          ))}
        </SmallIslands>
        <VideoAds ingame autoRefresh={preferedWindow === 'second_screen'} />
      </aside>
    </Container>
  );
};

const root = createRoot(document.querySelector('#root'));
root.render(
  <StrictMode>
    <App>
      <SecondScreen />
    </App>
  </StrictMode>
);
