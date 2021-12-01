import type { ObjectId } from 'mongodb';

export type TrophyProgress = {
  trophyName: string;
  progress:
    | {
        progress: number;
        details: any;
      }
    | number;
};

export type HistoryMatch = {
  accountId: ObjectId;
  gameId: number;
  championId: number;
  win: boolean;
  queueId: number;
  gameDuration: number;
  gameCreatedAt: Date;
  trophyNames: string[];
  allTrophiesProgress: TrophyProgress[];
};
