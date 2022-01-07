import { SeasonAccount } from '..';
import { getDatabase, getCollection } from '../../utils/server/db';
import { Account } from '../types';

export const createAccountsCollection = async () => {
  const db = await getDatabase();
  const collections = await db.listCollections().toArray();

  if (collections.some((collection) => collection.name === 'accounts')) {
    console.log('accounts Collection already exists');
    return;
  }

  await db.createCollection('accounts', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        properties: {
          summoner: {
            bsonType: 'object',
            properties: {
              platformId: {
                bsonType: 'string',
              },
              accountId: {
                bsonType: 'string',
              },
              profileIconId: {
                bsonType: 'number',
              },
              name: {
                bsonType: 'string',
              },
              id: {
                bsonType: 'string',
              },
              puuid: {
                bsonType: 'string',
              },
              revisionDate: {
                bsonType: 'number',
              },
              summonerLevel: {
                bsonType: 'number',
              },
            },
          },
          islands: {
            bsonType: 'array',
          },
          levels: {
            bsonType: 'array',
          },
          trophies: {
            bsonType: 'array',
          },
          authTokens: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              properties: {
                token: {
                  bsonType: 'string',
                },
                expiresAt: {
                  bsonType: 'date',
                },
              },
            },
          },
          games: {
            bsonType: 'number',
          },
          lastGameIds: {
            bsonType: 'array',
          },
          lastMigrationAt: {
            bsonType: 'date',
          },
          trophiesCompleted: {
            bsonType: 'number',
          },
          missions: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              properties: {
                missionId: {
                  bsonType: 'string',
                },
                completedTrophyNames: {
                  bsonType: 'array',
                  items: {
                    bsonType: 'string',
                  },
                },
              },
            },
          },
          missionTrophiesCompleted: {
            bsonType: 'number',
          },
        },
        required: [
          'islands',
          'levels',
          'trophies',
          'authTokens',
          'trophiesCompleted',
          'missions',
          'missionTrophiesCompleted',
        ],
      },
    },
  });
};

export const getAccountsCollection = () => {
  return getCollection<Account>('accounts');
};

export const ensureAccountsIndexes = () => {
  console.log('Create accounts indexes');
  return getAccountsCollection().createIndexes([
    { key: { trophiesCompleted: -1, 'summoner.revisionDate': -1 } },
    { key: { 'summoner.platformId': 1, 'summoner.name': 1 } },
  ]);
};

export const createSeasonAccountsCollection = async () => {
  const db = await getDatabase();
  const collections = await db.listCollections().toArray();

  if (collections.some((collection) => collection.name === 'season-accounts')) {
    console.log('season-accounts Collection already exists');
    return;
  }

  await db.createCollection('season-accounts', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        properties: {
          season: {
            bsonType: 'string',
          },
          summoner: {
            bsonType: 'object',
            properties: {
              platformId: {
                bsonType: 'string',
              },
              accountId: {
                bsonType: 'string',
              },
              profileIconId: {
                bsonType: 'number',
              },
              name: {
                bsonType: 'string',
              },
              id: {
                bsonType: 'string',
              },
              puuid: {
                bsonType: 'string',
              },
              revisionDate: {
                bsonType: 'number',
              },
              summonerLevel: {
                bsonType: 'number',
              },
            },
          },
          islands: {
            bsonType: 'array',
          },
          levels: {
            bsonType: 'array',
          },
          trophies: {
            bsonType: 'array',
          },
          games: {
            bsonType: 'number',
          },
          lastGameIds: {
            bsonType: 'array',
          },
          trophiesCompleted: {
            bsonType: 'number',
          },
          missions: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              properties: {
                missionId: {
                  bsonType: 'string',
                },
                completedTrophyNames: {
                  bsonType: 'array',
                  items: {
                    bsonType: 'string',
                  },
                },
              },
            },
          },
          missionTrophiesCompleted: {
            bsonType: 'number',
          },
        },
        required: ['islands', 'levels', 'trophies', 'trophiesCompleted'],
      },
    },
  });
};

export const getSeasonAccountsCollection = () => {
  return getCollection<SeasonAccount>('season-accounts');
};

export const ensureSeasonAccountsIndexes = () => {
  console.log('Create season accounts indexes');
  return getSeasonAccountsCollection().createIndexes([
    { key: { season: 1, trophiesCompleted: -1, 'summoner.revisionDate': -1 } },
    { key: { 'summoner.accountId': 1 } },
  ]);
};
