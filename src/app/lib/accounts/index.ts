import { AccountClient, Credential, Ranking, SeasonAccount } from './types';
import { postJSON, getJSON } from '../utils/request';
import { log } from '../logs';
import { TrophyProgress } from '../matches';
export * from './types';

export const postLogin = (credential: Credential) => {
  return postJSON<AccountClient>('/api/login', credential);
};

export const getAccount = () => {
  return getJSON<AccountClient>('/api/account');
};

export const getPublicAccount = ({ summonerName, platformId }: Credential) => {
  return getJSON<AccountClient>(
    `/api/public-account?summonerName=${summonerName}&platformId=${platformId}`
  );
};

export const postCheck = (matchId: number) => {
  log(`postCheck ${matchId}`);
  return postJSON<{
    trophyNames: string[];
    unlockedIslandNames: string[];
    missionTrophyNames: string[];
    allTrophiesProgress: TrophyProgress[];
  }>('/api/check', { matchId });
};

type GetRankingsResult = {
  data: Ranking[];
  currentPage: number;
  pages: number;
  count: number;
  limit: number;
  hasMore: boolean;
};
export const getRankings = ({
  season,
  page,
}: {
  season: string;
  page: number;
}) => {
  return getJSON<GetRankingsResult>(
    `/api/rankings?season=${season}&page=${page}`
  );
};

export const getSeasonAccount = (season: string) => {
  return getJSON<SeasonAccount>(`/api/season-account?season=${season}`);
};

export const rankingBySummonerName = ({
  season,
  summonerName,
}: {
  season: string;
  summonerName: string;
}) => {
  return getJSON<Ranking[]>(
    `/api/rankings?season=${season}&summonerName=${summonerName}`
  );
};
