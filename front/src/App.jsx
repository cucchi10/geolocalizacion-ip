// eslint-disable-next-line no-unused-vars
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Main from './routes/index';
import './utils/styles/index.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>

  );
}

export default App;
