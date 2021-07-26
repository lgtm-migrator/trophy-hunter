import { TrophyClient } from '../../types';
import base from './base';
import LastChampions from '../LastChampions';

const diversity: TrophyClient = {
  ...base,
  ProgressDetails: LastChampions,
};

export default diversity;
