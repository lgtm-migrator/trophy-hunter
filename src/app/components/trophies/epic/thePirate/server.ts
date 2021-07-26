import { TrophyServer } from '../../types';
import base from './base';
import { getOpponents } from '../../../../lib/riot/helpers';

const thePirate: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant }) => {
    const participantBaronKills = events.filter(
      (event) =>
        event.type === 'ELITE_MONSTER_KILL' &&
        event.monsterType === 'BARON_NASHOR' &&
        event.killerId === participant.participantId
    );
    const opponentIds = getOpponents(match, participant).map(
      (opponent) => opponent.participantId
    );
    const opponentKills = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' && opponentIds.includes(event.killerId)
    );

    const teamDeathsBeforeBaron = participantBaronKills.map((baronKill) =>
      opponentKills.filter(
        (kill) =>
          baronKill.timestamp > kill.timestamp &&
          baronKill.timestamp <= kill.timestamp + 40000
      )
    );

    const pirateScore = Math.max(
      0,
      Math.max(...teamDeathsBeforeBaron.map((deaths) => deaths.length))
    );

    return pirateScore / 2;
  },
};

export default thePirate;
