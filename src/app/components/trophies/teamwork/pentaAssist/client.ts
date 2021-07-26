import { TrophyClient } from '../../types';
import base from './base';
import { zip } from '../../../../lib/utils/arrays';

const pentaAssist: TrophyClient = {
  ...base,
  checkLive: ({ events, account, gameData }) => {
    const assists = events.filter(
      (event) =>
        event.EventName === 'ChampionKill' &&
        event.Assisters.includes(account.summoner.name)
    );

    const participantMultiAssistEvents = zip(
      assists,
      assists.slice(1),
      assists.slice(2),
      assists.slice(3),
      assists.slice(4)
    );

    const pentaAssists = participantMultiAssistEvents.filter((multiAssist) => {
      const firstTwoKillsSpree =
        multiAssist[1] &&
        multiAssist[0].EventTime + 20 > multiAssist[1].EventTime;
      const secondTwoKillsSpree =
        multiAssist[2] &&
        multiAssist[1].EventTime + 20 > multiAssist[2].EventTime;
      const thirdTwoKillsSpree =
        multiAssist[3] &&
        multiAssist[2].EventTime + 20 > multiAssist[3].EventTime;
      const fourthTwoKillsSpree =
        multiAssist[4] &&
        multiAssist[3].EventTime + 20 > multiAssist[4].EventTime;

      return (
        firstTwoKillsSpree &&
        secondTwoKillsSpree &&
        thirdTwoKillsSpree &&
        fourthTwoKillsSpree
      );
    }).length;

    const requiredPentaAsissts = gameData.gameMode === 'ARAM' ? 2 : 1;
    return pentaAssists / requiredPentaAsissts;
  },
};

export default pentaAssist;
