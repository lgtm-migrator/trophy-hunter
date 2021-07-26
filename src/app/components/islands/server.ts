import * as combat from './combat/levels/server';
import * as epic from './epic/levels/server';
import * as hub from './hub/levels/server';
import * as objectives from './objectives/levels/server';
import * as skills from './skills/levels/server';
import * as special from './special/levels/server';
import * as teamwork from './teamwork/levels/server';

const levels = {
  ...combat,
  ...epic,
  ...hub,
  ...objectives,
  ...skills,
  ...special,
  ...teamwork,
};
export default levels;
