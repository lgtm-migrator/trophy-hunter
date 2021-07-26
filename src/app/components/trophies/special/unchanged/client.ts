import { TrophyClient } from '../../types';
import base from './base';
import LastChampions from '../LastChampions';

const unchanged: TrophyClient = {
  ...base,
  ProgressDetails: LastChampions,
};

export default unchanged;
