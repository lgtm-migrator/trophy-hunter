import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
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
import { useHistory } from 'react-router-dom';
import useQueryParams from './hooks/useQueryParams';

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
  const history = useHistory();
  const queryParams = useQueryParams();
  const subpage = queryParams.get('subpage') || 'map';
  const tool = queryParams.get('tool');
  useCenterWindow();

  const setQueryParam = (newQuery: { [key: string]: string | undefined }) => {
    Object.entries(newQuery).forEach(([key, value]) => {
      if (value === undefined) {
        queryParams.delete(key);
      } else {
        queryParams.set(key, value);
      }
    });

    history.push(`/?${queryParams.toString()}`);
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
    </GameLayout>
  );
};

ReactDOM.render(
  <StrictMode>
    <App>
      <Main />
    </App>
  </StrictMode>,
  document.querySelector('#root')
);
