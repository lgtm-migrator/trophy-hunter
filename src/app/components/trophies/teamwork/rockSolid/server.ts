import { TrophyServer } from '../../types';
import base from './base';
import { getOpponents } from '../../../../lib/riot/helpers';

const rockSolid: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const opponents = getOpponents(match, participant);

    const physicalDamageTotal = opponents
      .map((p) => p.stats.physicalDamageDealtToChampions)
      .reduce((memo, num) => memo + num);
    const magicalDamageTotal = opponents
      .map((p) => p.stats.magicDamageDealtToChampions)
      .reduce((memo, num) => memo + num);
    const trueDamageTotal = opponents
      .map((p) => p.stats.trueDamageDealtToChampions)
      .reduce((memo, num) => memo + num);

    const opponentsPhysicalDamageRatio =
      physicalDamageTotal /
      (physicalDamageTotal + magicalDamageTotal + trueDamageTotal + 1);

    return Number(
      opponentsPhysicalDamageRatio > 0.6 &&
        participant.stats.win &&
        participant.championId === 54
    );
  },
};

export default rockSolid;
