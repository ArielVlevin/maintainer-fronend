import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/api/tasks";
import { useNotification } from "@/context/NotificationContext";

/**
 * Custom React Query hook for fetching tasks.
 *
 * @param {object} params - Query parameters.
 * @returns {object} Query result containing task data, loading state, and error state.
 */
export const useTasks = ({
  task_id,
  product_id,
  search,
  status,
  page = 1,
  limit = 10,
  enabled = true,
}: {
  task_id?: string;
  product_id?: string;
  search?: string;
  status?: "pending" | "completed" | "overdue";
  page?: number;
  limit?: number;
  enabled?: boolean;
}) => {
  const { showError } = useNotification();

  return useQuery({
    queryKey: ["tasks", task_id, product_id, search, status, page, limit],
    queryFn: async () => {
      try {
        return await fetchTasks({
          task_id,
          product_id,
          search,
          status,
          page,
          limit,
        });
      } catch (error) {
        console.error("❌ Error fetching tasks:", error);
        showError((error as Error).message || "Failed to load tasks.");
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: enabled || !!task_id || !!product_id || search !== undefined,
  });
};
