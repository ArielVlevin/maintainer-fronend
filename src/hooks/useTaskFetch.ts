import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/api/tasks";

/**
 * Custom React Query hook for fetching tasks.
 *
 * @param {object} params - Query parameters.
 * @returns {object} Query result containing task data, loading state, and error state.
 */
export const useTasks = ({
  taskId,
  productId,
  search,
  status,
  page = 1,
  limit = 10,
  enabled = true,
}: {
  taskId?: string;
  productId?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["tasks", taskId, productId, search, status, page, limit],
    queryFn: () =>
      fetchTasks({ taskId, productId, search, status, page, limit }),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: enabled || !!taskId || !!productId || search !== undefined, // Fetch only when needed
  });
};
