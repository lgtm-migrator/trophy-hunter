import { TrophyServer } from '../../types';
import base from './base';
import { getTeam } from '../../../../lib/riot/helpers';

const phoenixStance: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant }) => {
    const teamIds = getTeam(match, participant.teamId).map(
      (teammate) => teammate.participantId
    );

    const elderDragonKills = events.filter(
      (event) =>
        event.monsterSubType === 'ELDER_DRAGON' &&
        teamIds.includes(event.killerId)
    ).length;

    return Number(elderDragonKills >= 2 && participant.stats.win);
  },
};

export default phoenixStance;
