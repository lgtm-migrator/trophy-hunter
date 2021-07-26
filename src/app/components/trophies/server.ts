import * as combat from './combat/server';
import * as epic from './epic/server';
import * as hub from './hub/server';
import * as objectives from './objectives/server';
import * as skills from './skills/server';
import * as special from './special/server';
import * as teamwork from './teamwork/server';

const trophies = {
  ...combat,
  ...epic,
  ...hub,
  ...objectives,
  ...skills,
  ...special,
  ...teamwork,
};
export default trophies;

export const allTrophies = Object.values(trophies);
export const aramTrophies = allTrophies.filter((trophy) => trophy.aramSupport);
