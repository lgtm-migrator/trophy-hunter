import { TrophyBase } from '../../types';

export const SUMMONERS_RIFT_MINUTES = 19;
export const ARAM_MINUTES = 9;

const theElephant: TrophyBase = {
  island: 'hub',
  name: 'theElephant',
  level: 'hubTeamwork',
  title: 'The Elephant',
  description: `Do not die for more than ${SUMMONERS_RIFT_MINUTES} minutes.\nARAM: ${ARAM_MINUTES} minutes`,
  category: 'teamwork',
  aramSupport: true,
};

export default theElephant;
