import { Trophy } from '../types';

const purifyer: Trophy = {
  island: 'epic',
  name: 'purifyer',
  level: 'epic1',
  title: 'Purifyer',
  description: 'Score at least 30 kills in a match.',
  category: 'epic',
  checkProgress: ({ participant }) => {
    return participant.stats.kills / 30;
  },
  checkLive: ({ allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    return accountPlayer.scores.kills / 30;
  },
};

export default purifyer;
