import { api } from "@/api/axios";
import { TasksResponse } from "@/types/ApiResponse";
import { ITask } from "@/types/ITask";

/**
 * Fetch tasks from the API based on provided filters.
 *
 * @param {object} params - Query parameters.
 * @param {string} [params.taskId] - Fetch a specific task by ID.
 * @param {string} [params.productId] - Fetch tasks for a specific product.
 * @param {string} [params.search] - Search term to filter tasks.
 * @param {string} [params.status] - Filter tasks by status.
 * @param {number} [params.page=1] - Pagination: current page.
 * @param {number} [params.limit=10] - Number of tasks per page.
 * @returns {Promise<TasksResponse>} - A promise that resolves to the task data.
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
  status?: string;
  page?: number;
  limit?: number;
}): Promise<TasksResponse | ITask> => {
  try {
    const query = new URLSearchParams();
    query.append("page", page.toString());
    query.append("limit", limit.toString());
    if (taskId) query.append("taskId", taskId);
    if (productId) query.append("productId", productId);
    if (status) query.append("status", status);
    if (search) query.append("search", search);

    console.log("hiiii");
    const { data } = await api.get<{
      success: boolean;
      data?: ITask;
      items?: ITask[];
      total?: number;
      page?: number;
      totalPages?: number;
    }>(`/tasks?${query.toString()}`);

    // ✅ Ensure request was successful
    if (!data.success) {
      throw new Error("❌ Failed to fetch tasks.");
    }

    // ✅ If fetching a single task
    if (taskId) {
      if (!data.data) throw new Error("❌ Task not found.");
      return data.data; // Returning a single task
    }

    // ✅ If fetching multiple tasks
    if (!data.items) throw new Error("❌ No tasks found.");
    return {
      items: data.items,
      total: data.total ?? 0,
      page: data.page ?? 1,
      totalPages: data.totalPages ?? 1,
    };
  } catch (error) {
    console.error("❌ Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks. Please try again later.");
  }
};

/**
 * Adds a new maintenance task to a specific product.
 *
 * @param {string} product_id - The ID of the product to which the task belongs.
 * @param {ITask} task - The task details.
 * @returns {Promise<ITask>} A promise that resolves to the newly created task.
 * @throws {Error} If the request fails.
 */
export const addTask = async (product_id: string, task: ITask) => {
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
 * @param {ITask} updatedTaskData - The updated task details.
 * @returns {Promise<ITask>} A promise that resolves to the updated task.
 * @throws {Error} If the request fails.
 */
export const updateTask = async (
  taskId: string,
  updatedTaskData: ITask
): Promise<ITask> => {
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

/**
 * Fetches all maintenance tasks for a specific product.
 *
 * @param {string} productId - The ID of the product whose tasks should be retrieved.
 * @returns {Promise<ITask[]>} A promise that resolves to an array of tasks.
 * @throws {Error} If the request fails.
 
export const fetchProductTasks = async (
  productId: string
): Promise<ITask[]> => {
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
 * @returns {Promise<ITask>} A promise that resolves to the requested task.
 * @throws {Error} If the request fails.
 
export const fetchTaskById = async (taskId: string): Promise<ITask> => {
  try {
    const { data } = await api.get(`/tasks/${taskId}`);
    return data;
  } catch (error) {
    console.error("❌ Error fetching task:", error);
    throw new Error("Failed to fetch task.");
  }
};
/**
 * Fetches all maintenance tasks for the logged-in user.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Promise<ITask[]>} A promise resolving to an array of user-specific tasks.
 * @throws {Error} If the request fails.
 
export const fetchUserTasks = async (userId: string): Promise<ITask[]> => {
  try {
    const { data } = await api.get(`/tasks?user_id=${userId}`);
    return data;
  } catch (error) {
    console.error("❌ Error fetching user tasks:", error);
    throw new Error("Failed to fetch tasks.");
  }
};

*/
