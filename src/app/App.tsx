import { CacheProvider } from '@emotion/react';
import { cache } from '@emotion/css';
import { AccountProvider } from './contexts/account';
import GlobalStyles from './styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorBoundary from './components/common/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

function App({ children }) {
  return (
    <BrowserRouter>
      <ErrorBoundary autoClose>
        <CacheProvider value={cache}>
          <GlobalStyles />
          <QueryClientProvider client={queryClient}>
            <AccountProvider>{children}</AccountProvider>
          </QueryClientProvider>
        </CacheProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
