import { AccountLevel, AccountTrophy } from '..';
import levels from '../../../components/islands/server';
import { Account } from '../types';
import { trophyToAccountTrophy } from './functions';

const {
  hubCombat,
  hubEpic,
  hubObjectives,
  hubSkills,
  hubSpecial,
  hubTeamwork,
  welcome,
} = levels;

const levelsList = [
  welcome,
  hubCombat,
  hubEpic,
  hubObjectives,
  hubSkills,
  hubSpecial,
  hubTeamwork,
];
export const startingAccountLevels: AccountLevel[] = levelsList.map(
  (level) => ({
    name: level.name,
    island: 'hub',
    status: 'active',
    unlockedAt: Date.now(),
  })
);

export const startingTrophies = levelsList.reduce<AccountTrophy[]>(
  (curr, level) => [...curr, ...level.trophies.map(trophyToAccountTrophy)],
  []
);

export const partialNewAccount: Omit<Account, 'summoner' | 'authTokens'> = {
  islands: [
    {
      name: 'hub',
      status: 'open',
    },
  ],
  levels: startingAccountLevels,
  trophies: startingTrophies,
  games: 0,
  lastGameIds: [],
  trophiesCompleted: 0,
  missions: [],
  missionTrophiesCompleted: 0,
};
export const newAccount: Account = {
  summoner: {
    platformId: 'global',
    accountId: '',
    revisionDate: 0,
    name: 'Trophy Hunter',
    id: '',
    puuid: '',
    summonerLevel: 0,
  },
  authTokens: [],
  ...partialNewAccount,
};
