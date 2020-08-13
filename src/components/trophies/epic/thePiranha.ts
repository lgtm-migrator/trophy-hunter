import { Trophy } from '../types';
import { getParticipantByAccount } from '../../../api/riot/helpers';
import { getTrophyProgress } from '../../../api/accounts/helpers';

const thePiranha: Trophy = {
  island: 'epicIsland',
  name: 'thePiranha',
  level: 'epic2',
  title: 'The Piranha',
  description: 'Deal most damage to champions three times in a row.',
  category: 'epic',
  maxProgress: 3,
  checkProgress: ({ match, account }) => {
    const participant = getParticipantByAccount(match, account);

    const maxDamage = Math.max(
      ...match.participants.map(
        (participant) => participant.stats.totalDamageDealtToChampions
      )
    );

    const mostDamage =
      participant.stats.totalDamageDealtToChampions === maxDamage;

    if (!mostDamage) {
      return 0;
    }
    const trophyProgress = getTrophyProgress(account, 'thePiranha');
    return Number(mostDamage) / 3 + trophyProgress;
  },
};

export default thePiranha;
