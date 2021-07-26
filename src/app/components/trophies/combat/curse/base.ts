import { TrophyBase } from '../../types';

export const REQUIRED_MINUTES = 40;
const curse: TrophyBase = {
  island: 'combat',
  name: 'curse',
  level: 'combat7',
  title: 'Curse',
  description: `The total crowd control time that you dealt exceeds ${REQUIRED_MINUTES} minutes.`,
  category: 'combat',
};

export default curse;
