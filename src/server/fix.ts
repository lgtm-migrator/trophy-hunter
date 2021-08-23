import dotenv from 'dotenv';
dotenv.config();

import trophies from '../app/components/trophies/server';
import { TrophyServer } from '../app/components/trophies/types';
import { getAccountsCollection } from '../app/lib//accounts/server/collection';
import { AccountTrophy } from '../app/lib/accounts';
import { getTrophyStatsCollection } from '../app/lib/stats/server/collection';
import { initMongoDatabase } from '../app/lib/utils/server/db';

const trophyToAccountTrophy = (trophy: TrophyServer): AccountTrophy => ({
  name: trophy.name,
  island: trophy.island,
  level: trophy.level,
  status: 'active',
  progress: 0,
  progressDetails: null,
});

async function run() {
  await initMongoDatabase();
  const Accounts = await getAccountsCollection();

  const cursor = Accounts.find({});
  const total = await cursor.count();
  let count = 0;
  let account = await cursor.next();
  while (account) {
    count++;
    console.log(`Processing account ${count} of ${total}`);

    const accountTrophies = account.trophies.filter(
      (trophy) => !['wrecking', 'smashing', 'omnismash'].includes(trophy.name)
    );

    let changed = false;
    const combat1 = account.levels.find((level) => level.name === 'combat1');
    if (
      combat1 &&
      !account.trophies.some(
        (trophy) => trophy.name === trophies.igniteAssist.name
      )
    ) {
      changed = true;
      accountTrophies.push(trophyToAccountTrophy(trophies.igniteAssist));
      if (combat1.status === 'completed') {
        combat1.status = 'unlocked';
      }
    }

    const combat7 = account.levels.find((level) => level.name === 'combat7');
    if (
      combat7 &&
      !account.trophies.some(
        (trophy) => trophy.name === trophies.igniteKill.name
      )
    ) {
      changed = true;
      accountTrophies.push(trophyToAccountTrophy(trophies.igniteKill));
      if (combat7.status === 'completed') {
        combat7.status = 'unlocked';
      }
    }

    const hubTeamwork = account.levels.find(
      (level) => level.name === 'hubTeamwork'
    );
    if (
      hubTeamwork &&
      !account.trophies.some(
        (trophy) => trophy.name === trophies.minionSupport.name
      )
    ) {
      changed = true;
      accountTrophies.push(trophyToAccountTrophy(trophies.minionSupport));
      if (hubTeamwork.status === 'completed') {
        hubTeamwork.status = 'unlocked';
      }
    }

    if (changed) {
      await Accounts.updateOne(
        { _id: account._id },
        {
          $set: {
            trophies: accountTrophies,
            levels: account.levels,
          },
        }
      );
    }

    account = await cursor.next();
  }

  await getTrophyStatsCollection().deleteMany({
    trophyName: { $in: ['wrecking', 'smashing', 'omnismash'] },
  });

  console.log('DONE');
  process.exit();
}
run();
