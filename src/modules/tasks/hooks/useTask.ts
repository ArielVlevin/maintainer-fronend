import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/api/tasks";
import { useErrorHandler } from "@/context/ErrorContext";

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
  status?: "pending" | "completed" | "overdue";
  page?: number;
  limit?: number;
  enabled?: boolean;
}) => {
  const { showError } = useErrorHandler();

  return useQuery({
    queryKey: ["tasks", taskId, productId, search, status, page, limit],
    queryFn: async () => {
      try {
        return await fetchTasks({
          taskId,
          productId,
          search,
          status,
          page,
          limit,
        });
      } catch (error: any) {
        console.error("❌ Error fetching tasks:", error);
        showError(error.message || "Failed to load tasks.");
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: enabled || !!taskId || !!productId || search !== undefined,
  });
};
