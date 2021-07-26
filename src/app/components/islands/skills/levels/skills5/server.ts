import { LevelServer } from '../../../../levels/types';
import base from './base';
import trophies from '../../../../trophies/server';
import skills6 from '../skills6/server';

const skills5: LevelServer = {
  ...base,
  trophies: [
    trophies.appetizer,
    trophies.carryMode,
    trophies.flameBreath,
    trophies.glutton,
    trophies.theCougar,
  ],
  unlocksLevels: [skills6],
};

export default skills5;
