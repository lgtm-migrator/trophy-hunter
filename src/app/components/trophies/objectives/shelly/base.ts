import { i18n } from '../../../../lib/i18n/i18n';
import { TrophyBase } from '../../types';

const shelly: TrophyBase = {
  island: 'hub',
  name: 'shelly',
  level: 'hubObjectives',
  title: i18n('Shelly'),
  description: i18n('Your team kills the first Rift Herald.'),
  category: 'objectives',
};

export default shelly;
