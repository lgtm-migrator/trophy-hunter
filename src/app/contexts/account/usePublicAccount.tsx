import { useQuery } from 'react-query';
import { getPublicAccount } from '../../lib/accounts';
import useQueryParams from '../../hooks/useQueryParams';

function usePublicAccount() {
  const queryParams = useQueryParams();
  const subpage = queryParams.get('subpage');
  const summonerName = queryParams.get('summonerName');
  const platformId = queryParams.get('platformId');
  const { data: publicAccount } = useQuery(
    ['publicAccount', summonerName, platformId],
    () => getPublicAccount({ summonerName, platformId }),
    {
      enabled: Boolean(summonerName && platformId),
    }
  );

  return {
    showPublicAccount: subpage === 'profile',
    publicAccount,
  };
}

export default usePublicAccount;
