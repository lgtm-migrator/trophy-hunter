import { Level, TargetLevel } from '../components/levels/types';
import islands from '../components/islands/islands';
import * as levels from '../components/islands/levels';
import useQueryParams from './useQueryParams';

const useTargetLevel = () => {
  const queryParams = useQueryParams();
  const level = queryParams.get('level');

  const activeLevelName = typeof level === 'string' ? level : null;
  const activeLevel = levels[activeLevelName] as Level;

  const island =
    activeLevel && islands.find((island) => island.name === activeLevel.island);
  const targetLevel: TargetLevel = island && {
    islandName: island.name,
    level: activeLevel,
    top: island.centerTop,
    left: island.centerLeft,
  };

  return {
    level,
    targetLevel,
  };
};

export default useTargetLevel;
