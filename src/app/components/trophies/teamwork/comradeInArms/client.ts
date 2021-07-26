import { TrophyClient } from '../../types';
import base from './base';

const comradeInArms: TrophyClient = {
  ...base,
  checkLive: ({ events, account, trophyData }) => {
    if (!events.length || trophyData.comradeInArms) {
      return 0;
    }

    const duoKills = events.reduce<{ [teammate: string]: number }>(
      (duoKills, event) => {
        if (
          event.EventName !== 'ChampionKill' ||
          (event.KillerName !== account.summoner.name &&
            !event.Assisters.includes(account.summoner.name)) ||
          event.Assisters.length !== 1
        ) {
          return duoKills;
        }
        const teammate =
          event.KillerName === account.summoner.name
            ? event.Assisters[0]
            : event.KillerName;
        return {
          ...duoKills,
          [teammate]: (duoKills[teammate] || 0) + 1,
        };
      },
      {}
    );
    const progress = Math.min(1, Math.max(...Object.values(duoKills)) / 3);
    if (progress === 1) {
      trophyData.comradeInArms = true;
    }
    return progress;
  },
};

export default comradeInArms;
