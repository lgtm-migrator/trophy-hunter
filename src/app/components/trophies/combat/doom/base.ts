import { i18n } from '../../../../lib/i18n/i18n';
import { TrophyBase } from '../../types';

const doom: TrophyBase = {
  island: 'combat',
  name: 'doom',
  level: 'combat8',
  title: i18n('Doom'),
  description: i18n(
    'The total crowd control time that you dealt exceeds 6 seconds per minute.'
  ),
  category: 'combat',
};

export default doom;
