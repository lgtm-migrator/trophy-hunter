import { createContext } from 'react';
import { Account } from '../../lib/accounts';

interface AccountContextValue {
  account: Account;
  loading: boolean;
}

const AccountContext = createContext<AccountContextValue>({
  account: null,
  loading: true,
});

export default AccountContext;
