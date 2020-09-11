import { Trophy } from '../types';

const pesticide: Trophy = {
  island: 'epicIsland',
  name: 'pesticide',
  level: 'epic1',
  title: 'Pesticide',
  description: 'Kill more than 400 minions in a match.',
  category: 'epic',
  checkProgress: ({ participant }) => {
    return (
      (participant.stats.totalMinionsKilled +
        participant.stats.neutralMinionsKilled) /
      400
    );
  },
  checkLive: ({ allPlayers, account }) => {
    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    return accountPlayer.scores.creepScore / 400;
  },
};

export default pesticide;
