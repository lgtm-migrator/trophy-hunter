import styled from '@emotion/styled';
import { Fragment } from 'react';
import Button from '../common/Button';

import { useInfiniteQuery } from 'react-query';
import { getRankings, Ranking } from '../../lib/accounts';
import PlayerCard from './PlayerCard';
import useVersion from '../../hooks/useVersion';
import SummonerSearch from './SummonerSearch';
import useQueryParams from '../../hooks/useQueryParams';
import { Link } from 'react-router-dom';
import { i18n } from '../../lib/i18n/i18n';
import { Tooltip } from '../tooltip';

const TopPlayers = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -12px;
  margin-top: -12px;

  > * {
    margin-top: 12px;
    margin-left: 12px;
  }
`;
const MorePlayers = styled.div`
  display: grid;
  overflow-y: scroll;
  > * + * {
    margin-top: 6px;
  }
`;

const Container = styled.div`
  font-family: Roboto Mono;
  margin-top: 48px;
  padding: 15px;
  flex-grow: 1;
  display: grid;
  grid-template-rows: auto auto 1fr;

  nav {
    display: flex;
    flex-basis: 100%;
    margin-bottom: 15px;

    > * + * {
      margin-left: 15px;
    }
  }

  .morePlayers {
    margin-top: 12px;
    padding-right: 8px;
  }
`;

const NotFirst = styled.div`
  background: #3f3e43;
  flex: 3;
`;

const Leaderboard = () => {
  const queryParams = useQueryParams();
  const { season: currentSeason } = useVersion();
  const season = queryParams.get('season') || currentSeason;
  const activeSeason = typeof season === 'string' ? season : null;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(
      ['season', activeSeason],
      ({ pageParam = 0 }) =>
        getRankings({
          season: activeSeason,
          page: pageParam,
        }),
      {
        getNextPageParam: (result) =>
          result.hasMore ? result.currentPage + 1 : null,
      }
    );

  const [first, second, third] = data?.pages[0]?.data || [];
  const seasons = ['10', '11'];
  return (
    <Container>
      <nav>
        <SummonerSearch season={season} />
        {seasons.map((season) => (
          <Link key={season} to={`/?subpage=leaderboard&season=${season}`}>
            <Button as="a" active={activeSeason === season}>
              {i18n('Season')} {season}
            </Button>
          </Link>
        ))}
        <Tooltip text="Next season starts January 8" placement="top">
          <Button off as="a">
            Season 12
          </Button>
        </Tooltip>
      </nav>
      <TopPlayers>
        <PlayerCard size="L" rank={1} ranking={first} />
        <NotFirst>
          <PlayerCard size="M" rank={2} ranking={second} />
          <PlayerCard size="M" rank={3} ranking={third} />
        </NotFirst>
      </TopPlayers>
      <MorePlayers className="morePlayers">
        {status === 'success' && (
          <>
            {data.pages.length > 0 && (
              <>
                {data.pages.map((result, i) => (
                  <Fragment key={i}>
                    {result.data.map((ranking, index) => {
                      const rank = i * result.limit + index + 1;
                      if (rank <= 3) {
                        return <Fragment key={rank} />;
                      }
                      return (
                        <PlayerCard
                          key={ranking?.summonerName || rank}
                          size="S"
                          rank={rank}
                          ranking={ranking}
                        />
                      );
                    })}
                  </Fragment>
                ))}
                <Button
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? i18n('Loading more...')
                    : hasNextPage
                    ? i18n('Load More')
                    : i18n('Nothing more to load')}
                </Button>
              </>
            )}
          </>
        )}
        {status === 'loading' &&
          Array<Ranking>(10)
            .fill(null)
            .map((ranking, index) => (
              <PlayerCard
                key={ranking?.summonerName || index}
                size="S"
                rank={index + 4}
                ranking={ranking}
              />
            ))}
      </MorePlayers>
    </Container>
  );
};

export default Leaderboard;
