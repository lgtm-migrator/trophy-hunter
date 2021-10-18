import CombatProgress from './combat/CombatProgress';
import EpicProgress from './epic/EpicProgress';
import ObjectivesProgress from './objectives/ObjectivesProgress';
import SkillsProgress from './skills/SkillsProgress';
import SpecialProgress from './special/SpecialProgress';
import TeamworkProgress from './teamwork/TeamworkProgress';
import { FC } from 'react';
import { ProgressProps, Category } from './types';
import HubProgress from './hub/HubProgress';
import { i18n } from '../../lib/i18n/i18n';

export const categoriesMap: {
  [category in Category]: {
    value: Category;
    label: string;
    Icon: FC<ProgressProps>;
  };
} = {
  hub: {
    value: 'hub',
    label: i18n('Hub'),
    Icon: HubProgress,
  },
  combat: {
    value: 'combat',
    label: i18n('Combat'),
    Icon: CombatProgress,
  },
  skills: {
    value: 'skills',
    label: i18n('Skills'),
    Icon: SkillsProgress,
  },
  teamwork: {
    value: 'teamwork',
    label: i18n('Teamwork'),
    Icon: TeamworkProgress,
  },
  objectives: {
    value: 'objectives',
    label: i18n('Objectives'),
    Icon: ObjectivesProgress,
  },
  epic: {
    value: 'epic',
    label: i18n('Epic'),
    Icon: EpicProgress,
  },
  special: {
    value: 'special',
    label: i18n('Special'),
    Icon: SpecialProgress,
  },
};
