import { FC } from 'react';
import styled from '@emotion/styled';
import IslandFilter from '../icons/IslandFilter';
import FavoritesFilter from '../icons/FavoritesFilter';
import TrophyListItem from './TrophyListItem';
import useAvailableTrophies from '../../contexts/account/useAvailableTrophies';
import TrophyList from './TrophyList';

const Header = styled.header`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  flex-grow: 1;
`;

const Filter = styled.div`
  background: #3f3e43;
  margin-left: 4px;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvailableTrophies: FC = () => {
  const availableTrophies = useAvailableTrophies();

  return (
    <>
      <Header>
        <Title>Available Trophies</Title>
        <Filter>
          <IslandFilter />
        </Filter>
        <Filter>
          <FavoritesFilter />
        </Filter>
      </Header>
      <TrophyList>
        {availableTrophies.map((trophy) => (
          <TrophyListItem trophy={trophy} key={trophy.name} borderless />
        ))}
      </TrophyList>
    </>
  );
};

export default AvailableTrophies;
