import { CalendarEvent } from "@/types/ICalander";
import { api, ApiResponse } from "./axios";

/**
 * Fetches all maintenance tasks for a user.
 */
export const fetchUserTasksCalendar = async (): Promise<CalendarEvent[]> => {
  try {
    const { data } = await api.get<ApiResponse<CalendarEvent[]>>(
      "/calendar/user"
    );

    if (!data.success)
      throw new Error(
        data.error || data.message || "❌ Failed to fetch user tasks calendar."
      );

    return data.data as CalendarEvent[];
  } catch (error) {
    console.error(
      "❌ Error fetching user tasks calendar:",
      (error as Error)?.message || error
    );
    throw new Error((error as Error)?.message || "Failed to fetch user tasks.");
  }
};

/**
 * Fetches all maintenance tasks for a specific product.
 */
export const fetchProductTasksCalendar = async (
  productId: string
): Promise<CalendarEvent[]> => {
  try {
    const { data } = await api.get<ApiResponse<CalendarEvent[]>>(
      `/calendar/product/${productId}`
    );

    if (!data.success)
      throw new Error(
        data.error ||
          data.message ||
          "❌ Failed to fetch product tasks calendar."
      );

    return data.data as CalendarEvent[];
  } catch (error) {
    console.error(
      "❌ Error fetching product tasks calendar:",
      (error as Error)?.message || error
    );
    throw new Error(
      (error as Error)?.message || "Failed to fetch product tasks."
    );
  }
};
