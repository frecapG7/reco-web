import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { AuthContextProvider } from "./context/AuthContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ApiClient from "./api/ApiClient";
import { Suspense } from "react";

const queryClient = ApiClient;
const router = createBrowserRouter(routes, {
  future: {
    // Normalize `useNavigation()`/`useFetcher()` `formMethod` to uppercase
    v7_normalizeFormMethod: true,
  },
});

const App = () => {
  return (
    <Suspense fallback="loading...">
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
