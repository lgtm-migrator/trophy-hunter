import { getLocalStorageItem } from '../utils/storage';

export const SR_DRAFT_PICK = 400;
export const SR_RANKED_SOLO = 420;
export const SR_BLIND_PICK = 430;
export const SR_RANKED_FLEX = 440;
export const ARAM_HOWLING_ABYSS = 450;
export const SUPPORTED_QUEUE_IDS = [
  SR_DRAFT_PICK,
  SR_RANKED_SOLO,
  SR_BLIND_PICK,
  SR_RANKED_FLEX,
  ARAM_HOWLING_ABYSS,
];

export const queues = {
  [SR_DRAFT_PICK]: 'Draft',
  [SR_RANKED_SOLO]: 'Solo/Duo',
  [SR_BLIND_PICK]: 'Blind',
  [SR_RANKED_FLEX]: 'Flex',
  [ARAM_HOWLING_ABYSS]: 'ARAM',
};

if (getLocalStorageItem('dev', false)) {
  SUPPORTED_QUEUE_IDS.push(-1);
}
