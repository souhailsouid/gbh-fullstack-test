'use client'; 
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, 
      staleTime: 5 * 60 * 1000,
    },
  },
});
