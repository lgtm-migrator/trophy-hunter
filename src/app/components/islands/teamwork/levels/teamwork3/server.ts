import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import teamwork4 from '../teamwork4/server';

const teamwork3: LevelServer = {
  ...base,
  trophies: [
    trophies.dusk,
    trophies.greyEminence,
    trophies.highSociety,
    trophies.lifeAndDeath,
    trophies.lightBringer,
    trophies.mercenary,
    trophies.noxianArmy,
    trophies.noxianShield,
  ],
  unlocksLevels: [teamwork4],
};

export default teamwork3;
