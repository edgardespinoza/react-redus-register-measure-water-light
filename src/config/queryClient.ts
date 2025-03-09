import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 24 * 60 * 60 * 1000, // 24 horas sin volver a hacer la llamada
      gcTime: 25 * 60 * 60 * 1000, // 25 horas antes de eliminar la caché
      retry: 1, // Reintenta una vez si falla
      refetchOnWindowFocus: false, // No revalidar al cambiar de pestaña
    },
  },
});
