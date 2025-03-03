import { api } from "@/api/axios";
import { ITask } from "@/types/ITask";
import {
  createItem,
  updateItem,
  deleteItem,
  fetchPaginatedData,
} from "@/api/baseApi";
import { ApiResponse, BaseResponse } from "@/types/ApiResponse";

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
  task_id: string,
  updatedData: ITask
): Promise<ITask> => updateItem<ITask>("/tasks", task_id, updatedData);

/**
 * Deletes a task from the database.
 *
 * @param {string} taskId - The ID of the task to delete.
 */
export const deleteTask = async (task_id: string): Promise<void> =>
  deleteItem("/tasks", task_id);

/**
 * Fetch a paginated list of tasks.
 *
 * @param {object} params - Query parameters for filtering tasks.
 * @returns {Promise<ITask[]>} - List of tasks.
 */
export const fetchTasks = async ({
  task_id,
  product_id,
  search,
  status,
  page = 1,
  limit = 10,
}: {
  task_id?: string;
  product_id?: string;
  search?: string;
  status?: "pending" | "completed" | "overdue";
  page?: number;
  limit?: number;
}): Promise<BaseResponse<ITask>> => {
  const response = await fetchPaginatedData("/tasks", {
    params: { task_id, product_id, search, status, page, limit },
  });
  return response as BaseResponse<ITask>;
};

/**
 * Mark a task as completed.
 *
 * @param {string} taskId - The ID of the task to mark as completed.
 * @returns {Promise<ITask>} - The updated task.
 */
export const markTaskAsDone = async (task_id: string): Promise<ITask> => {
  try {
    const { data } = await api.patch<ApiResponse<ITask>>(
      `/tasks/${task_id}/complete`
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
 * @param {string} task_id - The ID of the task to postpone.
 * @param {number} days - The number of days to postpone the task.
 * @returns {Promise<{ success: boolean; message: string; task?: ITask }>} - The updated task and success message.
 */
export const postponeTask = async (task_id: string, days: number) => {
  try {
    const { data } = await api.patch<ApiResponse<ITask>>(
      `/tasks/${task_id}/postpone`,
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
