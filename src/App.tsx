
import './App.css'
import SnackbarProvider from './shared/components/snack-provider/snack-provider'
import { ThemeContextProvider } from './configs/theme-config/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './auth/components/auth-context';

import { BrowserRouter as Router } from 'react-router-dom';
import MyRouter from './routes/router-config';

const queryClient = new QueryClient();

function App() {


  return (
    <SnackbarProvider>
      <AuthProvider>
        <ThemeContextProvider>
          <QueryClientProvider client={queryClient}>
            <Router>
              <MyRouter />
            </Router>
          </QueryClientProvider>
        </ThemeContextProvider>
      </AuthProvider>
    </SnackbarProvider>

  )
}

export default App
