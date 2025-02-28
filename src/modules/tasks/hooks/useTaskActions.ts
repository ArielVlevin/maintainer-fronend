import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITask } from "@/types/ITask";
import {
  addTask,
  deleteTask,
  markTaskAsDone,
  postponeTask,
  updateTask,
} from "@/api/tasks";
import { useNotification } from "@/context/NotificationContext";

/**
 * Custom hook for managing task actions (delete, update, add).
 */
export const useTaskActions = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useNotification();

  // ✅ Delete Task
  const deleteMutation = useMutation({
    mutationFn: async (task_id: string) => deleteTask(task_id),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showSuccess("Task deleted successfully! 🗑️");
    },
    onError: () => {
      showError("Failed to delete task.");
    },
  });

  // ✅ Update Task
  const updateMutation = useMutation({
    mutationFn: async ({
      task_id,
      updatedData,
    }: {
      task_id: string;
      updatedData: ITask;
    }) => updateTask(task_id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showSuccess("Task updated successfully! ✨");
    },
    onError: () => {
      showError("Failed to update task.");
    },
  });

  const addMutation = useMutation({
    mutationFn: async ({
      product_id,
      newTaskData,
    }: {
      product_id: string;
      newTaskData: ITask;
    }) => addTask(product_id, newTaskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showSuccess("Task added successfully! 🎉");
    },
    onError: () => {
      showError("Failed to add task.");
    },
  });

  const completeTaskMutation = useMutation({
    mutationFn: async (task_id: string) => markTaskAsDone(task_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      showSuccess("Task completed successfully! ✅");
    },
    onError: (error) => {
      showError(error.message || "Failed to complete task.");
    },
  });

  /**
   * Mutation for postponing a task.
   *
   * @returns {object} Mutation object to handle postponing tasks.
   *
   * @example
   * postponeTaskMutation.mutate({ taskId: "task123", days: 3 });
   */
  const postponeTaskMutation = useMutation({
    mutationFn: async ({ task_id, days }: { task_id: string; days: number }) =>
      postponeTask(task_id, days),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showSuccess("Task postponed successfully!");
    },
    onError: () => {
      showError("Failed to postpone task.");
    },
  });
  return {
    deleteMutation,
    updateMutation,
    addMutation,
    completeTaskMutation,
    postponeTaskMutation,
  };
};
