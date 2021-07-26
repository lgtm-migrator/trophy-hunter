import { FC, SVGProps } from 'react';
import { TrophyClient, TrophyServer } from '../trophies/types';

export interface MarkerProps extends SVGProps<SVGGElement> {
  status: 'active' | 'unlocked' | 'locked' | 'completed';
  focused: boolean;
  level: LevelClient;
}

export type Island =
  | 'hub'
  | 'combat'
  | 'skills'
  | 'teamwork'
  | 'special'
  | 'epic'
  | 'objectives';

export interface LevelBase {
  island: Island;
  name: string;
  title: string;
}

export interface LevelClient extends LevelBase {
  Icon: React.FC;
  Marker: FC<MarkerProps>;
  trophies: TrophyClient[];
}

export interface LevelServer extends LevelBase {
  trophies: TrophyServer[];
  unlocksLevels: LevelServer[];
}

export type TargetLevel = {
  islandName: string;
  level: LevelClient;
  top: number;
  left: number;
};
