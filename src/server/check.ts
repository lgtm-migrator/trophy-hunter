import { Request, Response } from 'express';
import Ajv from 'ajv';
import { getAccountsCollection } from '../app/lib/accounts/server/collection';
import levels from '../app/components/islands/server';
import { LevelServer } from '../app/components/levels/types';
import {
  getMatchAndTimeline,
  getTeammateAccounts,
  isMatchInProgress,
} from '../app/lib//riot/server';
import {
  AccountIsland,
  AccountLevel,
  AccountTrophy,
} from '../app/lib//accounts';
import {
  getAllEvents,
  getParticipantBySummonerName,
} from '../app/lib//riot/helpers';
import {
  ARAM_HOWLING_ABYSS,
  SUPPORTED_QUEUE_IDS,
} from '../app/lib/riot/queues';
import { log } from '../app/lib//logs';
import {
  getUnlockedIslandNames,
  isLevelCompleted,
  isLevelNearlyCompleted,
  trophyToAccountTrophy,
} from '../app/lib//accounts/server/functions';
import { addHistoryMatch } from '../app/lib//matches/server/functions';
import { updateTrophyStats } from '../app/lib//stats/server';
import { allTrophies, aramTrophies } from '../app/components/trophies/server';
import { getTrophyProgress } from '../app/lib//accounts/helpers';
import { getMissionsCollection } from '../app/lib//missions/server/collection';
import { TrophyProgress } from '../app/lib//matches';

const activeChecks: string[] = [];

export const handlePostCheck = async (req: Request, res: Response) => {
  const ajv = new Ajv();
  const valid = ajv.validate(
    {
      type: 'object',
      properties: {
        matchId: {
          type: 'integer',
        },
      },
      required: ['matchId'],
    },
    req.body
  );
  if (!valid) {
    return res.status(422).json(ajv.errors);
  }

  const { authToken } = req.cookies;
  const { matchId } = req.body;

  try {
    if (activeChecks.includes(authToken)) {
      return res.status(401).end('Already checking a match');
    }
    activeChecks.push(authToken);

    if (!authToken) {
      return res.status(401).end('Unauthorized');
    }

    const Accounts = await getAccountsCollection();
    const account = await Accounts.findOne({
      authTokens: {
        $elemMatch: {
          token: authToken,
          expiresAt: { $gt: new Date() },
        },
      },
    });

    if (!account) {
      log(`Account not found ${authToken}`);
      res.setHeader(
        'Set-Cookie',
        `authToken=${authToken};Max-Age=0;SameSite=None;${
          process.env.NODE_ENV === 'production' ? 'Secure' : ''
        }`
      );
      return res.status(401).end('Unauthorized');
    }

    if (account.lastGameIds.includes(matchId)) {
      return res.status(403).end('Already checked');
    }

    log(
      `${activeChecks.length} check ${matchId} of ${account.summoner.name} ${account.summoner.platformId}`
    );

    const [match, timeline] = await getMatchAndTimeline({
      platformId: account.summoner.platformId,
      matchId,
    });

    if (!match || !timeline) {
      const matchInProgress = await isMatchInProgress({
        platformId: account.summoner.platformId,
        encryptedSummonerId: account.summoner.id,
      });
      console.warn(`matchInProgress: ${matchInProgress}`);
      return res.status(404).end('Match in progress');
    }

    if (!SUPPORTED_QUEUE_IDS.includes(match.info.queueId)) {
      return res
        .status(403)
        .end(`Game mode ${match.info.queueId} is not supported`);
    }

    if (match.info.gameDuration < 5 * 60) {
      return res.json({
        trophyNames: [],
        unlockedIslandNames: [],
        missionTrophyNames: [],
        allTrophiesProgress: [],
      });
    }

    const events = getAllEvents(timeline);

    const now = Date.now();

    const completedTrophyNames: string[] = [];
    const unlockedIslandNames: string[] = [];

    const participant = getParticipantBySummonerName(
      match,
      account.summoner.name
    );
    if (!participant) {
      log(`Participant not found ${matchId} ${account.summoner.name}`);
      return res.status(403).end('Participant not found');
    }

    const teammateAccounts = await getTeammateAccounts(match, participant);

    const accountLevels = [...account.levels];
    const accountIslands = [...account.islands];
    const accountTrophies = [...account.trophies];

    const activeMission = (await getMissionsCollection().findOne({
      active: true,
    }))!;

    let accountMission = account.missions.find(
      (mission) => mission.missionId.toString() === activeMission._id.toString()
    );
    if (!accountMission) {
      accountMission = {
        missionId: activeMission._id,
        completedTrophyNames: [],
      };
      account.missions.push(accountMission);
    }
    const missionTrophyNames: string[] = [];
    activeMission.trophyNames.forEach((trophyName) => {
      if (accountMission!.completedTrophyNames.includes(trophyName)) {
        return;
      }
      const trophy = allTrophies.find((trophy) => trophy.name === trophyName)!;
      const result = trophy.checkProgress({
        match,
        timeline,
        account,
        events,
        participant,
        teammateAccounts,
        missionTrophiesCompleted: 0,
      });
      const { progress } =
        typeof result === 'number' ? { progress: result } : result;
      if (progress >= 0.999) {
        missionTrophyNames.push(trophyName);
        accountMission!.completedTrophyNames.push(trophyName);
      }
    });
    if (missionTrophyNames.length > 0) {
      account.missionTrophiesCompleted += missionTrophyNames.length;
      await Accounts.updateOne(
        { _id: account._id },
        {
          $set: {
            missions: account.missions,
            missionTrophiesCompleted: account.missionTrophiesCompleted,
          },
        }
      );
    }

    accountLevels.forEach((accountLevel) => {
      if (accountLevel.status === 'completed') {
        return;
      }

      const level = levels[accountLevel.name] as LevelServer;
      let levelTrophiesCompleted = 0;
      // Filter level trophies ARAM/SR

      const trophiesToCheck =
        match.info.queueId === ARAM_HOWLING_ABYSS
          ? level.trophies.filter((trophy) => trophy.aramSupport)
          : level.trophies;

      trophiesToCheck.forEach((trophy) => {
        let accountTrophy: AccountTrophy = accountTrophies.find(
          (accountTrophy) => accountTrophy.name === trophy.name
        )!;
        if (!accountTrophy) {
          accountTrophy = {
            name: trophy.name,
            island: trophy.island,
            level: trophy.level,
            status: 'active',
            progress: 0,
            progressDetails: null,
          };
          accountTrophies.push(accountTrophy);
        }
        if (accountTrophy.status === 'completed') {
          levelTrophiesCompleted++;
          return;
        }

        const result = trophy.checkProgress({
          match,
          timeline,
          account,
          events,
          participant,
          teammateAccounts,
          missionTrophiesCompleted: missionTrophyNames.length,
        });
        const { progress, details } =
          typeof result === 'number'
            ? { progress: result, details: null }
            : result;
        if (progress < 1 && !trophy.maxProgress) {
          return;
        }
        accountTrophy.progress = Math.min(1, progress);
        accountTrophy.progressDetails = details;
        if (progress >= 0.999) {
          // Sometimes it is not exactly 1
          accountTrophy.progress = 1;
          accountTrophy.status = 'completed';
          levelTrophiesCompleted++;
          completedTrophyNames.push(accountTrophy.name);
        }
      });
      const levelINearlyCompleted = isLevelNearlyCompleted(
        level,
        levelTrophiesCompleted
      );
      const levelIsCompleted = isLevelCompleted(level, levelTrophiesCompleted);
      if (!levelINearlyCompleted) {
        return;
      }
      const newIslandNames = getUnlockedIslandNames(level);
      unlockedIslandNames.push(
        ...newIslandNames.filter(
          (islandName) =>
            !account.islands.some((island) => island.name === islandName)
        )
      );

      if (levelIsCompleted) {
        accountLevel.status = 'completed';
      } else if (levelINearlyCompleted) {
        accountLevel.status = 'unlocked';
      }

      const unlockIslandLevels = level.unlocksLevels.filter(
        (unlockLevel) => unlockLevel.island !== level.island
      );
      accountIslands.push(
        ...unlockIslandLevels
          .map<AccountIsland>((level) => ({
            name: level.island,
            status: 'open',
          }))
          .filter(
            (accountLevel) =>
              !account.levels.some((level) => level.name === accountLevel.name)
          )
      );

      const newLevels = level.unlocksLevels.filter(
        (level) =>
          !accountLevels.some(
            (accountLevel) => accountLevel.name === level.name
          )
      );
      accountLevels.push(
        ...newLevels.map<AccountLevel>((level) => ({
          name: level.name,
          island: level.island,
          status: 'active',
          unlockedAt: now,
        }))
      );

      const newTrophies = newLevels.reduce<AccountTrophy[]>(
        (curr, level) => [
          ...curr,
          ...level.trophies.map(trophyToAccountTrophy),
        ],
        []
      );
      accountTrophies.push(...newTrophies);

      const isIslandComplete = !accountLevels
        .filter(
          (accountLevel) =>
            accountLevel.island === level.island &&
            accountLevel.name !== level.name
        )
        .some((level) => level.status === 'active');
      if (!isIslandComplete) {
        return;
      }
      const island = accountIslands.find(
        (island) => island.name === level.island
      )!;
      island.status = 'done';
    });

    const lastGameIds = [matchId, ...account.lastGameIds.slice(0, 9)];
    const trophiesCompleted = accountTrophies.filter(
      (trophy) => trophy.status === 'completed'
    ).length;

    await Accounts.updateOne(
      { _id: account._id },
      {
        $set: {
          levels: accountLevels,
          trophies: accountTrophies,
          islands: accountIslands,
          games: account.games + 1,
          lastGameIds: lastGameIds,
          trophiesCompleted,
        },
      }
    );

    const allTrophiesProgress: TrophyProgress[] = [];
    const trophiesAboutToCheck =
      match.info.queueId === ARAM_HOWLING_ABYSS ? aramTrophies : allTrophies;
    trophiesAboutToCheck.forEach((trophy) => {
      const result = trophy.checkProgress({
        match,
        timeline,
        account,
        events,
        participant,
        teammateAccounts,
        missionTrophiesCompleted: missionTrophyNames.length,
      });
      allTrophiesProgress.push({ trophyName: trophy.name, progress: result });
      const { progress } =
        typeof result === 'number' ? { progress: result } : result;

      let obtained = false;
      if (trophy.maxProgress) {
        const prevProgress = getTrophyProgress(account, trophy.name);
        if (progress > prevProgress) {
          obtained = true;
        }
      } else if (progress >= 0.999) {
        obtained = true;
      }
      updateTrophyStats({
        trophyName: trophy.name,
        mapId: match.info.mapId,
        championId: participant.championId,
        obtained,
      });
    });

    res.json({
      trophyNames: completedTrophyNames,
      unlockedIslandNames: unlockedIslandNames,
      missionTrophyNames,
      allTrophiesProgress,
    });

    await addHistoryMatch({
      accountId: account._id,
      gameId: match.info.gameId,
      championId: participant.championId,
      win: participant.win,
      queueId: match.info.queueId,
      gameDuration: match.info.gameDuration,
      gameCreatedAt: new Date(match.info.gameCreation),
      trophyNames: completedTrophyNames,
      allTrophiesProgress,
    });
  } finally {
    activeChecks.splice(activeChecks.indexOf(authToken), 1);
  }
};
