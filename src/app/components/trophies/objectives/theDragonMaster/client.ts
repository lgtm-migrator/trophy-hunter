import { TrophyClient } from '../../types';
import base from './base';

const theDragonMaster: TrophyClient = {
  ...base,
  checkLive: ({ events, account }) => {
    const earlyDragonKills = events.filter(
      (event) => event.EventName === 'DragonKill' && event.EventTime < 10 * 60
    );

    return Number(
      earlyDragonKills[0] &&
        earlyDragonKills[0].KillerName === account.summoner.name
    );
  },
};

export default theDragonMaster;
