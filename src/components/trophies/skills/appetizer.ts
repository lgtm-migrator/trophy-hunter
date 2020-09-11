import { Trophy } from '../types';

const appetizer: Trophy = {
  island: 'skillsIsland',
  name: 'appetizer',
  level: 'skills5',
  title: 'Appetizer',
  description: 'Farm at least 80 minions at 10 minutes.',
  category: 'skills',
  checkProgress: ({ participant }) => {
    if (!participant.timeline.creepsPerMinDeltas) {
      return 0;
    }

    return participant.timeline.creepsPerMinDeltas['0-10'] / 8;
  },
  checkLive: ({ allPlayers, trophyData, gameData, account }) => {
    if (
      !allPlayers ||
      !gameData ||
      trophyData.appetizer ||
      gameData.gameTime > 600
    ) {
      return 0;
    }

    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );

    const process = Math.min(1, accountPlayer.scores.creepScore / 80);
    if (process === 1) {
      trophyData.appetizer = true;
    }
    return process;
  },
};

export default appetizer;
