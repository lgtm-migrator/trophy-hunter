import dotenv from 'dotenv';
dotenv.config();

import {
  getAccountsCollection,
  getSeasonAccountsCollection,
} from '../app/lib//accounts/server/collection';
import { initMongoDatabase } from '../app/lib/utils/server/db';

async function run() {
  await initMongoDatabase();
  const Accounts = await getAccountsCollection();
  const SeasonAccounts = await getSeasonAccountsCollection();
  if (await SeasonAccounts.findOne({ season: '11' })) {
    return;
  }

  const cursor = Accounts.find({});
  const total = await cursor.count();
  let count = 0;
  let account = await cursor.next();
  while (account) {
    count++;
    console.log(`Processing account ${count} of ${total}`);

    await SeasonAccounts.insertOne({
      season: '11',
      summoner: account.summoner,
      islands: account.islands,
      levels: account.levels,
      trophies: account.trophies,
      games: account.games,
      lastGameIds: account.lastGameIds,
      trophiesCompleted: account.trophiesCompleted,
      missionTrophiesCompleted: account.missionTrophiesCompleted,
      missions: account.missions,
    });
    const now = Date.now();
    await Accounts.updateOne(
      {
        _id: account._id,
      },
      {
        $set: {
          islands: [
            {
              name: 'hub',
              status: 'open',
            },
          ],
          levels: [
            'welcome',
            'hubCombat',
            'hubEpic',
            'hubObjectives',
            'hubSkills',
            'hubSpecial',
            'hubTeamwork',
          ].map((name) => ({
            name,
            island: 'hub',
            status: 'active',
            unlockedAt: now,
          })),
          trophies: [],
          games: 0,
          favoriteTrophyNames: [],
          trophiesCompleted: 0,
          missionTrophiesCompleted: 0,
          missions: [],
        },
      }
    );
    account = await cursor.next();
  }

  console.log('DONE');
  process.exit();
}
run();
