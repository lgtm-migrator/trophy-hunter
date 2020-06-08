import { Trophy } from '../types';
import SkillsProgress from '../skills/SkillsProgress';

const farmer: Trophy = {
  island: 'hubIsland',
  name: 'farmer',
  level: 'hubSkills',
  title: 'Farmer',
  description: 'Farm more than 200 minions.',
  ProgressIcon: SkillsProgress,
  checkProgress: ({ match, account }) => {
    const participantIdentity = match.participantIdentities.find(
      (participantIdentity) =>
        participantIdentity.player.accountId === account.summoner.accountId
    );
    const participant = match.participants.find(
      (participant) =>
        participant.participantId === participantIdentity.participantId
    );

    return Number(
      participant.stats.neutralMinionsKilled +
        participant.stats.neutralMinionsKilledEnemyJungle +
        participant.stats.neutralMinionsKilledTeamJungle >=
        200
    );
  },
  checkLive: ({ allPlayers, trophyData, account }) => {
    if (trophyData.farmer || !allPlayers) {
      return 0;
    }

    const accountPlayer = allPlayers.find(
      (player) => player.summonerName === account.summoner.name
    );
    if (accountPlayer.scores.creepScore >= 200) {
      trophyData.farmer = true;
    }

    return Math.min(1, accountPlayer.scores.creepScore / 200);
  },
};

export default farmer;
