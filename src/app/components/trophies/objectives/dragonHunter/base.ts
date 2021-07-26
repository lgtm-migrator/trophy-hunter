import { TrophyBase } from '../../types';

export const REQUIRED_DRAGONS = 5;
const dragonHunter: TrophyBase = {
  island: 'hub',
  name: 'dragonHunter',
  level: 'hubObjectives',
  title: 'Dragon Hunter',
  description: `Kill ${REQUIRED_DRAGONS} dragons (team achievement).`,
  category: 'objectives',
  maxProgress: REQUIRED_DRAGONS,
};

export default dragonHunter;
