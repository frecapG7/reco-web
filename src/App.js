import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import { AuthContext, AuthContextProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';




const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 30000,
    }
  }
});


const router = createBrowserRouter(routes, {
  future: {
    // Normalize `useNavigation()`/`useFetcher()` `formMethod` to uppercase
    v7_normalizeFormMethod: true,
  },
});



const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <CssBaseline />  
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthContextProvider>
    </ThemeProvider>

  );
}

export default App;
