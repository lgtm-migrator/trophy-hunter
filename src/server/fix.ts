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

    const accountTrophies = [...account.trophies];

    let changed = false;

    const combat8 = account.levels.find((level) => level.name === 'combat8');
    if (
      combat8 &&
      !account.trophies.some((trophy) => trophy.name === trophies.doom.name)
    ) {
      changed = true;
      accountTrophies.push(trophyToAccountTrophy(trophies.doom));
      if (combat8.status === 'completed') {
        combat8.status = 'unlocked';
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
