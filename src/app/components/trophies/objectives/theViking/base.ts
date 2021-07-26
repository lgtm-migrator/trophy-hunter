import { TrophyBase } from '../../types';

export const REQUIRED_MINUTES = 11;

const theViking: TrophyBase = {
  island: 'hub',
  name: 'theViking',
  level: 'hubObjectives',
  title: 'The Viking',
  description: `Get a solo kill before ${REQUIRED_MINUTES} minutes and take down or assist first tower.`,
  category: 'objectives',
};

export default theViking;
