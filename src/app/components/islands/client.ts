import * as combat from './combat/levels/client';
import * as epic from './epic/levels/client';
import * as hub from './hub/levels/client';
import * as objectives from './objectives/levels/client';
import * as skills from './skills/levels/client';
import * as special from './special/levels/client';
import * as teamwork from './teamwork/levels/client';

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
