import { TrophyClient } from '../../types';
import base from './base';
import LastChampions from '../LastChampions';

const oneTrickPony: TrophyClient = {
  ...base,
  ProgressDetails: LastChampions,
};

export default oneTrickPony;
