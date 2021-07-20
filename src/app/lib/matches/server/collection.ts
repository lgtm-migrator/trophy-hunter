import { getDatabase, getCollection } from '../../utils/server/db';
import { HistoryMatch } from '../types';

export const createMatchesCollection = async () => {
  const db = await getDatabase();
  const collections = await db.listCollections().toArray();

  if (collections.some((collection) => collection.name === 'matches')) {
    console.log('matches Collection already exists');
    return;
  }

  await db.createCollection('matches', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        properties: {
          accountId: {
            bsonType: 'objectId',
          },
          gameId: {
            bsonType: 'number',
          },
          championId: {
            bsonType: 'number',
          },
          win: {
            bsonType: 'bool',
          },
          queueId: {
            bsonType: 'number',
          },
          gameDuration: {
            bsonType: 'number',
          },
          gameCreatedAt: {
            bsonType: 'date',
          },
          trophyNames: {
            bsonType: 'array',
            items: {
              bsonType: 'string',
            },
          },
        },
        required: [
          'accountId',
          'gameId',
          'championId',
          'win',
          'queueId',
          'gameDuration',
          'gameCreatedAt',
          'trophyNames',
        ],
      },
    },
  });
};

export const getMatchesCollection = () => {
  return getCollection<HistoryMatch>('matches');
};

export const ensureMatchesIndexes = () => {
  console.log('Create matches indexes');
  return getMatchesCollection().createIndex(
    { accountId: 1, gameId: -1 },
    { unique: true }
  );
};
