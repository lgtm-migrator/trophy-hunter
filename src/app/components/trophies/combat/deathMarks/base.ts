import { TrophyBase } from '../../types';

export const REQUIRED_SECONDS = 30;
const deathMarks: TrophyBase = {
  island: 'combat',
  name: 'deathMarks',
  level: 'combat2',
  title: 'Death Marks',
  description: `Perform seven kills and don't die in the ${REQUIRED_SECONDS} seconds afer each kill.`,
  category: 'combat',
  maxProgress: 7,
};

export default deathMarks;
