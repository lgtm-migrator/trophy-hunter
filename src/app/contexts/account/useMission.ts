import { useQuery } from 'react-query';
import { getMission } from '../../lib/missions';
import { Mission } from '../../lib/missions/types';

export const useMission = (): Mission | undefined => {
  const { data: mission } = useQuery('mission', getMission);
  return mission;
};
