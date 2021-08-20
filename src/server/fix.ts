import dotenv from 'dotenv';
dotenv.config();

import trophies from '../app/components/trophies/server';
import { TrophyServer } from '../app/components/trophies/types';
import { getAccountsCollection } from '../app/lib//accounts/server/collection';
import { AccountTrophy } from '../app/lib/accounts';
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
  while (await cursor.hasNext()) {
    const account = await cursor.next();
    const newTrophies: AccountTrophy[] = [];

    let changed = false;
    const hubObjectives = account.levels.find(
      (level) => level.name === 'hubObjectives'
    );
    if (
      hubObjectives &&
      !account.trophies.some((trophy) => trophy.name === trophies.wrecking.name)
    ) {
      changed = true;
      newTrophies.push(trophyToAccountTrophy(trophies.wrecking));
      if (hubObjectives.status === 'completed') {
        hubObjectives.status = 'unlocked';
      }
    }

    const objectives1 = account.levels.find(
      (level) => level.name === 'objectives1'
    );
    if (
      objectives1 &&
      !account.trophies.some((trophy) => trophy.name === trophies.smashing.name)
    ) {
      changed = true;
      newTrophies.push(trophyToAccountTrophy(trophies.smashing));
      if (objectives1.status === 'completed') {
        objectives1.status = 'unlocked';
      }
    }

    const objectives4 = account.levels.find(
      (level) => level.name === 'objectives4'
    );
    if (
      objectives4 &&
      !account.trophies.some(
        (trophy) => trophy.name === trophies.omnismash.name
      )
    ) {
      changed = true;
      newTrophies.push(trophyToAccountTrophy(trophies.omnismash));
      if (objectives4.status === 'completed') {
        objectives4.status = 'unlocked';
      }
    }

    if (changed) {
      await Accounts.updateOne(
        { _id: account._id },
        {
          $addToSet: {
            trophies: {
              $each: newTrophies,
            },
          },
          $set: {
            levels: account.levels,
          },
        }
      );
    }
  }
  console.log('DONE');
}
run();
