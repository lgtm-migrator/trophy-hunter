import MapIcon from '../icons/Map';
import LeaderboardIcon from '../icons/Leaderboard';
import HistoryIcon from '../icons/History';
import styled from '@emotion/styled';
import { Tooltip } from '../tooltip';
import useVersion from '../../hooks/useVersion';
import NavIconButton from './NavIconButton';
import FancyButton from './FancyButton';
import useQueryParams from '../../hooks/useQueryParams';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  display: flex;
`;

const BackButton = styled(FancyButton)`
  margin: 0;
  text-decoration: none;
  text-transform: initial;

  :active {
    text-decoration: none;
  }
`;

const SubpageNav = () => {
  const queryParams = useQueryParams();
  const { season: currentSeason } = useVersion();
  const subpage = queryParams.get('subpage') || 'map';

  return (
    <Nav onClick={(event) => event.stopPropagation()}>
      {subpage === 'profile' ? (
        <Link to="/?subpage=leaderboard">
          <BackButton as="a">Back to leaderboard</BackButton>
        </Link>
      ) : (
        <>
          <Tooltip title="Map" placement="top">
            <div>
              <Link to={`/?subpage=map`}>
                <NavIconButton as="a" active={subpage === 'map'}>
                  <MapIcon />
                </NavIconButton>
              </Link>
            </div>
          </Tooltip>
          <Tooltip title="Leaderboard" placement="top">
            <div>
              <Link to={`/?subpage=leaderboard&season=${currentSeason}`}>
                <NavIconButton as="a" active={subpage === 'leaderboard'}>
                  <LeaderboardIcon />
                </NavIconButton>
              </Link>
            </div>
          </Tooltip>
          <Tooltip title="History" placement="top">
            <div>
              <Link to={`/?subpage=history`}>
                <NavIconButton disabled as="a" active={subpage === 'history'}>
                  <HistoryIcon />
                </NavIconButton>
              </Link>
            </div>
          </Tooltip>
        </>
      )}
    </Nav>
  );
};

export default SubpageNav;
