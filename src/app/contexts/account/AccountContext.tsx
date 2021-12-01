import { createContext } from 'react';
import { AccountClient } from '../../lib/accounts';

interface AccountContextValue {
  account: AccountClient;
  loading: boolean;
}

const AccountContext = createContext<AccountContextValue>({
  account: null,
  loading: true,
});

export default AccountContext;
