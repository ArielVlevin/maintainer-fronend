import { useQuery } from "@tanstack/react-query";
import {
  fetchUserTasksCalendar,
  fetchProductTasksCalendar,
} from "@/api/taskCalendar";

/**
 * Hook for fetching calendar tasks.
 */
export const useTaskCalendar = ({ productId }: { productId?: string }) => {
  return useQuery({
    queryKey: productId
      ? ["calendar", "product", productId]
      : ["calendar", "user"],
    queryFn: () =>
      productId
        ? fetchProductTasksCalendar(productId)
        : fetchUserTasksCalendar(),
    staleTime: 1000 * 60 * 5,
  });
};
