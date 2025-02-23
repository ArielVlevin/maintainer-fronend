import { api } from "@/api/axios";
import { BaseResponse } from "@/types/ApiResponse";
import { ITask } from "@/types/ITask";
import { createItem, updateItem, deleteItem } from "@/api/baseApi";

/**
 * Fetch a paginated list of tasks.
 *
 * @param {object} params - Query parameters for filtering tasks.
 * @returns {Promise<BaseResponse<ITask>>} - List of tasks with pagination data.
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
}): Promise<BaseResponse<ITask>> => {
  try {
    const response = await api.get<BaseResponse<ITask>>("/tasks", {
      params: { taskId, productId, search, status, page, limit },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks.");
  }
};

/**
 * Adds a new task to a specific product in the database.
 *
 * @param {string} product_id - The ID of the product to which the task belongs.
 * @param {ITask} task - The task details.
 * @returns {Promise<ITask>} A promise that resolves to the newly created task.
 * @throws {Error} If the request fails.
 *
 * @example
 * const newTask = await addTask("product123", { taskName: "Clean Filter", frequency: 7 });
 */
export const addTask = (product_id: string, task: ITask) =>
  createItem<ITask>(`/tasks/${product_id}`, task);

/**
 * Updates an existing task.
 *
 * @param {string} taskId - The ID of the task to update.
 * @param {ITask} updatedData - The updated task details.
 * @returns {Promise<ITask>} A promise that resolves to the updated task.
 * @throws {Error} If the request fails.
 *
 * @example
 * const updatedTask = await updateTask("task123", { taskName: "Replace Filter" });
 */
export const updateTask = (taskId: string, updatedData: ITask) =>
  updateItem<ITask>("/tasks", taskId, updatedData);

/**
 * Deletes a task from the database.
 *
 * @param {string} taskId - The ID of the task to delete.
 * @returns {Promise<void>} A promise that resolves when the task is successfully deleted.
 * @throws {Error} If the request fails.
 *
 * @example
 * await deleteTask("task123");
 */
export const deleteTask = (taskId: string) => deleteItem("/tasks", taskId);

/**
 * Mark a task as completed.
 *
 * @param {string} taskId - The ID of the task to mark as completed.
 * @returns {Promise<void>} - Resolves when the task is successfully updated.
 */
export const markTaskAsDone = async (taskId: string): Promise<void> => {
  try {
    await api.patch(`/tasks/${taskId}/complete`);
  } catch (error) {
    console.error("❌ Error completing task:", error);
    throw new Error("Failed to complete task.");
  }
};

/**
 * Postpone a task by a given number of days.
 *
 * @param {string} taskId - The ID of the task to postpone.
 * @param {number} days - The number of days to postpone the task.
 * @returns {Promise<{ success: boolean; message: string; task?: ITask }>} - The updated task and success message.
 * @throws {Error} If the request fails.
 *
 * @example
 * const response = await postponeTask("task123", 5);
 * console.log(response.message); // "Task postponed by 5 days"
 */
export const postponeTask = async (taskId: string, days: number) => {
  try {
    const { data } = await api.patch(`/tasks/${taskId}/postpone`, { days });
    return data;
  } catch (error) {
    console.error("❌ Error postponing task:", error);
    throw new Error("Failed to postpone task.");
  }
};
