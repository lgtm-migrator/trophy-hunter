import { i18n } from '../../../../lib/i18n/i18n';
import { TrophyBase } from '../../types';

const fertilizer: TrophyBase = {
  island: 'hub',
  name: 'fertilizer',
  level: 'hubEpic',
  title: i18n('Fertilizer'),
  description: i18n('Reach level 10 before 15 minutes.\nARAM: level 12'),
  category: 'epic',
  aramSupport: true,
};

export default fertilizer;
