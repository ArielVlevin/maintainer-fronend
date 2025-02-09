import { IMaintenanceTask } from "@/types";
import { api } from "@/api/axios";

/**
 * Fetches all maintenance tasks for a specific product.
 *
 * @param {string} productId - The ID of the product whose tasks should be retrieved.
 * @returns {Promise<IMaintenanceTask[]>} A promise that resolves to an array of tasks.
 * @throws {Error} If the request fails.
 */
export const fetchProductTasks = async (
  productId: string
): Promise<IMaintenanceTask[]> => {
  try {
    const { data } = await api.get(`/products/${productId}/tasks`);
    return data;
  } catch (error) {
    console.error("❌ Error fetching product tasks:", error);
    throw new Error("Failed to fetch product tasks.");
  }
};

/**
 * Fetches a maintenance task by its ID.
 *
 * @param {string} taskId - The ID of the task to fetch.
 * @returns {Promise<IMaintenanceTask>} A promise that resolves to the requested task.
 * @throws {Error} If the request fails.
 */
export const fetchTaskById = async (
  taskId: string
): Promise<IMaintenanceTask> => {
  try {
    const { data } = await api.get(`/tasks/${taskId}`);
    return data;
  } catch (error) {
    console.error("❌ Error fetching task:", error);
    throw new Error("Failed to fetch task.");
  }
};

/**
 * Adds a new maintenance task to a specific product.
 *
 * @param {string} product_id - The ID of the product to which the task belongs.
 * @param {IMaintenanceTask} task - The task details.
 * @returns {Promise<IMaintenanceTask>} A promise that resolves to the newly created task.
 * @throws {Error} If the request fails.
 */
export const addTaskToProduct = async (
  product_id: string,
  task: IMaintenanceTask
) => {
  try {
    const { data } = await api.post(`/tasks/${product_id}`, {
      ...task,
      product_id,
    });
    return data;
  } catch (error) {
    console.error("❌ Error adding task:", error);
    throw new Error("Failed to add task.");
  }
};

/**
 * Updates an existing maintenance task by its ID.
 *
 * @param {string} taskId - The ID of the task to update.
 * @param {IMaintenanceTask} updatedTaskData - The updated task details.
 * @returns {Promise<IMaintenanceTask>} A promise that resolves to the updated task.
 * @throws {Error} If the request fails.
 */
export const updateTask = async (
  taskId: string,
  updatedTaskData: IMaintenanceTask
): Promise<IMaintenanceTask> => {
  try {
    const { data } = await api.put(`/tasks/${taskId}`, updatedTaskData);
    return data;
  } catch (error) {
    console.error("❌ Error updating task:", error);
    throw new Error("Failed to update task.");
  }
};

/**
 * Deletes a maintenance task by its ID.
 *
 * @param {string} taskId - The ID of the task to delete.
 * @throws {Error} If the request fails.
 */
export const deleteTask = async (taskId: string) => {
  try {
    await api.delete(`/tasks/${taskId}`);
  } catch (error) {
    console.error("❌ Error deleting task:", error);
    throw new Error("Failed to delete task.");
  }
};
