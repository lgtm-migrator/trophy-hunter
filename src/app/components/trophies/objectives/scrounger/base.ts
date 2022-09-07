import { i18n } from '../../../../lib/i18n/i18n';
import { TrophyBase } from '../../types';

const scrounger: TrophyBase = {
  island: 'hub',
  name: 'scrounger',
  level: 'objectives1',
  title: i18n('Scrounger'),
  description: i18n('Participate in stealing three objectives.'),
  category: 'objectives',
  maxProgress: 3,
};

export default scrounger;
