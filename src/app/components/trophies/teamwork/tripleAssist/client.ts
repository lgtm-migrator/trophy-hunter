import { TrophyClient } from '../../types';
import base from './base';
import { zip } from '../../../../lib/utils/arrays';

const tripleAssist: TrophyClient = {
  ...base,
  checkLive: ({ events, account, gameData }) => {
    const requiredTripleAssists = gameData.gameMode === 'ARAM' ? 2 : 1;

    const assists = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.Assisters.includes(account.summoner.name)
    );

    const participantMultiAssistEvents = zip(
      assists,
      assists.slice(1),
      assists.slice(2)
    );

    const tripleAssists = participantMultiAssistEvents.filter((multiAssist) => {
      const firstTwoKillsSpree =
        multiAssist[1] &&
        multiAssist[0].EventTime + 10 > multiAssist[1].EventTime;
      const secondTwoKillsSpree =
        multiAssist[2] &&
        multiAssist[1].EventTime + 10 > multiAssist[2].EventTime;

      return firstTwoKillsSpree && secondTwoKillsSpree;
    }).length;

    return tripleAssists / requiredTripleAssists;
  },
};

export default tripleAssist;
