import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import teamwork6 from '../teamwork6/server';

const teamwork5: LevelServer = {
  ...base,
  trophies: [
    trophies.theGuard,
    trophies.unbreakableWill,
    trophies.voidAura,
    trophies.watcher,
    trophies.zenithBlade,
  ],
  unlocksLevels: [teamwork6],
};

export default teamwork5;
