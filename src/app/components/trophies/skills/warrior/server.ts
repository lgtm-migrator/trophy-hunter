import { TrophyServer } from '../../types';
import base from './base';
import { calcKDA } from '../../../../lib/riot/helpers';

const warrior: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return calcKDA(participant) / 1.5;
  },
};

export default warrior;
