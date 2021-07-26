import levels from '../../components/islands/client';
import { LevelClient } from '../../components/levels/types';
import { useMemo } from 'react';
import { TrophyClient } from '../../components/trophies/types';
import { Account } from '../../lib/accounts';
import { allTrophies } from '../../components/trophies/client';
import { useMission } from './useMission';

const useAvailableTrophies = (account: Account) => {
  const mission = useMission();
  const missionTrophyNames = mission?.trophyNames || [];

  const availableTrophies = useMemo(() => {
    if (!account || !mission) {
      return [];
    }
    const availableTrophies = account.levels
      .sort((a, b) => b.unlockedAt - a.unlockedAt)
      .reduce<TrophyClient[]>((availableTrophies, activeLevel) => {
        const level: LevelClient = levels[activeLevel.name];
        if (!level) {
          return availableTrophies;
        }
        const trophies = level.trophies.filter((trophy) => {
          const accountTrophy = account.trophies.find(
            (accountTrophy) => accountTrophy.name === trophy.name
          );
          return !accountTrophy || accountTrophy.status !== 'completed';
        });
        return [...availableTrophies, ...trophies];
      }, []);
    const accountMission = account.missions.find(
      (accountMission) =>
        accountMission.missionId.toString() === mission._id.toString()
    );
    const accountMissionTrophyNames =
      accountMission?.completedTrophyNames || [];

    missionTrophyNames.forEach((missionTrophyName) => {
      if (
        !availableTrophies.some(
          (availableTrophy) => availableTrophy.name === missionTrophyName
        ) &&
        !accountMissionTrophyNames.includes(missionTrophyName)
      ) {
        const trophy = allTrophies.find(
          (trophy) => trophy.name === missionTrophyName
        );
        availableTrophies.push(trophy);
      }
    });

    return availableTrophies;
  }, [account, missionTrophyNames, mission]);

  return availableTrophies;
};

export default useAvailableTrophies;
