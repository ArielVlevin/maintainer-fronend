import { api } from "./axios";

/**
 * Fetches all maintenance tasks for a user.
 */
export const fetchUserTasksCalendar = async () => {
  const response = await api.get("/calendar/user");
  return response.data.events;
};

/**
 * Fetches all maintenance tasks for a specific product.
 */
export const fetchProductTasksCalendar = async (productId: string) => {
  const response = await api.get(`/calendar/product/${productId}`);
  return response.data.events;
};
