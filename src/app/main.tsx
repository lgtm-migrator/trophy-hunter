import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import GameLayout, { GameChildProps } from './layouts/GameLayout';
import GarenaModal from './components/modals/GarenaModal';
import useCenterWindow from './hooks/useCenterWindow';
import Map from './components/map/Map';
import MapOverview from './components/map/MapOverview';
import Leaderboard from './components/leaderboard/Leaderboard';
import LeaderboardOverview from './components/leaderboard/LeaderboardOverview';
import History from './components/history/History';
import HistoryOverview from './components/history/HistoryOverview';
import Help from './components/help/Help';
import SpreadTheLove from './components/help/SpreadTheLove';
import EnableOverlayModal from './components/modals/EnableOverlayModal';
import Profile from './components/trophies/Profile';
import App from './App';
import { useNavigate } from 'react-router-dom';
import useQueryParams from './hooks/useQueryParams';
import SeasonModal from './components/modals/SeasonModal';
import usePersistentState from './hooks/usePersistentState';

const subpages: {
  [subpage: string]: {
    Main: (props: GameChildProps) => JSX.Element;
    Aside: (props: GameChildProps) => JSX.Element;
    hideProfile?: boolean;
  };
} = {
  map: {
    Main: Map,
    Aside: MapOverview,
  },
  leaderboard: {
    Main: Leaderboard,
    Aside: LeaderboardOverview,
  },
  history: {
    Main: History,
    Aside: HistoryOverview,
  },
  help: {
    Main: Help,
    Aside: SpreadTheLove,
    hideProfile: true,
  },
  profile: {
    Main: Map,
    Aside: HistoryOverview,
  },
};

const Main = () => {
  const navigate = useNavigate();
  const queryParams = useQueryParams();
  const subpage = queryParams.get('subpage') || 'map';
  const tool = queryParams.get('tool');
  useCenterWindow();
  const [sawSeason12Modal, setSawSeason12Modal] = usePersistentState(
    'sawSeason12Modal',
    false
  );

  const setQueryParam = (newQuery: { [key: string]: string | undefined }) => {
    Object.entries(newQuery).forEach(([key, value]) => {
      if (value === undefined) {
        queryParams.delete(key);
      } else {
        queryParams.set(key, value);
      }
    });

    navigate(`/?${queryParams.toString()}`);
  };

  const { Main, Aside, hideProfile } = subpages[subpage];

  return (
    <GameLayout
      activeTool={tool}
      onToolClick={(newTool) => {
        setQueryParam({
          tool: newTool === tool ? undefined : newTool,
          level: undefined,
        });
      }}
      aside={
        <>
          {!hideProfile && <Profile />}
          <Aside onQueryChange={setQueryParam} />
        </>
      }
      onMainClick={() => {
        if (queryParams.get(tool) || queryParams.get('level')) {
          setQueryParam({ tool: undefined, level: undefined });
        }
      }}
    >
      <Main onQueryChange={setQueryParam} />
      <GarenaModal />
      <EnableOverlayModal />
      {!sawSeason12Modal && (
        <SeasonModal onClose={() => setSawSeason12Modal(true)} />
      )}
    </GameLayout>
  );
};

const root = createRoot(document.querySelector('#root'));
root.render(
  <StrictMode>
    <App>
      <Main />
    </App>
  </StrictMode>
);
