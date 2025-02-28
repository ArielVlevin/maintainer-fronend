import { api, ApiResponse } from "@/api/axios";
import { ITask } from "@/types/ITask";
import { createItem, updateItem, deleteItem } from "@/api/baseApi";

/**
 * Adds a new task to a specific product in the database.
 *
 * @param {string} product_id - The ID of the product to which the task belongs.
 * @param {ITask} task - The task details.
 * @returns {Promise<ITask>} A promise that resolves to the newly created task.
 */
export const addTask = async (
  product_id: string,
  task: ITask
): Promise<ITask> => createItem<ITask>(`/tasks/${product_id}`, task);

/**
 * Updates an existing task.
 *
 * @param {string} taskId - The ID of the task to update.
 * @param {ITask} updatedData - The updated task details.
 * @returns {Promise<ITask>} A promise that resolves to the updated task.
 */
export const updateTask = (
  taskId: string,
  updatedData: ITask
): Promise<ITask> => updateItem<ITask>("/tasks", taskId, updatedData);

/**
 * Deletes a task from the database.
 *
 * @param {string} taskId - The ID of the task to delete.
 */
export const deleteTask = async (taskId: string): Promise<void> =>
  deleteItem("/tasks", taskId);

/**
 * Fetch a paginated list of tasks.
 *
 * @param {object} params - Query parameters for filtering tasks.
 * @returns {Promise<ITask[]>} - List of tasks.
 */
export const fetchTasks = async ({
  taskId,
  productId,
  search,
  status,
  page = 1,
  limit = 10,
}: {
  taskId?: string;
  productId?: string;
  search?: string;
  status?: "pending" | "completed" | "overdue";
  page?: number;
  limit?: number;
}): Promise<ITask[]> => {
  try {
    const { data } = await api.get<ApiResponse<ITask[]>>("/tasks", {
      params: { taskId, productId, search, status, page, limit },
    });

    if (!data.success)
      throw new Error(data.error || "❌ Failed to fetch tasks.");

    return data.data as ITask[];
  } catch (error) {
    console.error(
      "❌ Error fetching tasks:",
      (error as Error)?.message || error
    );
    throw new Error((error as Error)?.message || "Failed to fetch tasks.");
  }
};

/**
 * Mark a task as completed.
 *
 * @param {string} taskId - The ID of the task to mark as completed.
 * @returns {Promise<ITask>} - The updated task.
 */
export const markTaskAsDone = async (taskId: string): Promise<ITask> => {
  try {
    const { data } = await api.patch<ApiResponse<ITask>>(
      `/tasks/${taskId}/complete`
    );

    if (!data.success)
      throw new Error(data.error || "❌ Failed to complete task.");

    return data.data as ITask;
  } catch (error) {
    console.error(
      "❌ Error completing task:",
      (error as Error)?.message || error
    );
    throw new Error((error as Error)?.message || "Failed to complete task.");
  }
};

/**
 * Postpone a task by a given number of days.
 *
 * @param {string} taskId - The ID of the task to postpone.
 * @param {number} days - The number of days to postpone the task.
 * @returns {Promise<{ success: boolean; message: string; task?: ITask }>} - The updated task and success message.
 */
export const postponeTask = async (taskId: string, days: number) => {
  try {
    const { data } = await api.patch<ApiResponse<ITask>>(
      `/tasks/${taskId}/postpone`,
      { days }
    );

    if (!data.success)
      throw new Error(data.error || "❌ Failed to postpone task.");

    return data.data;
  } catch (error) {
    console.error(
      "❌ Error postponing task:",
      (error as Error)?.message || error
    );
    throw new Error((error as Error)?.message || "Failed to postpone task.");
  }
};
