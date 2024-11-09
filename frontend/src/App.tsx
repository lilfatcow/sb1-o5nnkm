import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { MoniteContext } from './lib/monite';
import { moniteSDK } from './lib/monite';
import Router from './Router';
import { Toaster } from './components/ui/toaster';

// Configure React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MoniteContext.Provider value={moniteSDK}>
        <BrowserRouter>
          <Router />
          <Toaster />
        </BrowserRouter>
      </MoniteContext.Provider>
    </QueryClientProvider>
  );
}

export default App;