import { TrophyServer } from '../../types';
import base from './base';

const theCougar: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    if (participant.timeline.lane !== 'JUNGLE') {
      return 0;
    }
    const otherJungler = match.participants.find(
      (player) =>
        player.timeline.lane === 'JUNGLE' &&
        player.teamId !== participant.teamId
    );
    if (!otherJungler) {
      return 0;
    }

    const goldAt10 = participant.timeline.goldPerMinDeltas['0-10'] * 10;
    const goldAt10OtherJungler =
      otherJungler.timeline.goldPerMinDeltas['0-10'] * 10;

    const theCougar = goldAt10OtherJungler + 1000 <= goldAt10;
    return Number(theCougar);
  },
};

export default theCougar;
