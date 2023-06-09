import logo from './logo.svg';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { routes } from './routes';
import { Layout } from './Layout';




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


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}/>
      <CssBaseline />
      <Layout>
        <RouterProvider router={router} />
      </Layout>  
    </QueryClientProvider>
  );
}

export default App;
