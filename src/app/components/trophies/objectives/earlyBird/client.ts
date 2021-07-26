import { TrophyClient } from '../../types';
import base from './base';

const earlyBird: TrophyClient = {
  ...base,
  checkLive: ({ events, account }) => {
    const firstKill = events.find(
      (event) => event.EventName === 'ChampionKill'
    );
    const firstTower = events.find(
      (event) => event.EventName === 'TurretKilled'
    );

    const firstBloodKill =
      firstKill && firstKill.KillerName === account.summoner.name;
    const firstTowerKill =
      firstTower && firstTower.KillerName === account.summoner.name;
    const firstTowerAssist =
      firstTower && firstTower.Assisters.includes(account.summoner.name);

    return (
      (Number(firstBloodKill) + Number(firstTowerKill || firstTowerAssist)) / 2
    );
  },
};

export default earlyBird;
