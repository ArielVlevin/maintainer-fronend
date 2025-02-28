import { useQuery } from "@tanstack/react-query";
import {
  fetchUserTasksCalendar,
  fetchProductTasksCalendar,
} from "@/api/taskCalendar";

/**
 * Hook for fetching calendar tasks.
 */
export const useTaskCalendar = ({ product_id }: { product_id?: string }) => {
  return useQuery({
    queryKey: product_id
      ? ["calendar", "product", product_id]
      : ["calendar", "user"],
    queryFn: () =>
      product_id
        ? fetchProductTasksCalendar(product_id)
        : fetchUserTasksCalendar(),
    staleTime: 1000 * 60 * 5,
  });
};
