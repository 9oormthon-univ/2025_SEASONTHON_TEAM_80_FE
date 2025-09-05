import { QueryClient } from "@tanstack/react-query";
import { handleApiError } from "@/apis/config/error";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
    },
    mutations: {
      onError: (error) => {
        const message = handleApiError(error);
        console.error("Mutation Error:", message);
      },
    },
  },
});
