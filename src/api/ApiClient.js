import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { FetchError } from "../hooks/api/FetchError";

const handleError = (error) => {
  if (error instanceof FetchError) {
    if (error.status === 401) {
      // Redirect to login
      alert("Redirect to login");
    } else if (error.status === 403) {
      // Redirect to forbidden
      alert("Redirect to forbidden");
    } else if (error.status === 404) {
      // Redirect to not found
      alert("Redirect to not found");
    } else if (error.status === 500) {
      alert("Internal server error");
    }
  } else console.error(error);
};

export default new QueryClient({
  queryCache: new QueryCache({
    onError: handleError,
  }),
  mutationCache: new MutationCache({
    onError: handleError,
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 30000,
    },
  },
});
