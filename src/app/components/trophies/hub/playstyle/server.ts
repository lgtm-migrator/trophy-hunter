import { TrophyServer } from '../../types';
import base from './base';

const playstyle: TrophyServer = {
  ...base,
  checkProgress: () => 1,
};

export default playstyle;
