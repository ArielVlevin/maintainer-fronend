import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITask } from "@/types/ITask";
import { useErrorHandler } from "@/context/ErrorContext";
import {
  addTask,
  deleteTask,
  markTaskAsDone,
  postponeTask,
  updateTask,
} from "@/api/tasks";

/**
 * Custom hook for managing task actions (delete, update, add).
 */
export const useTaskActions = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useErrorHandler();

  // ✅ Delete Task
  const deleteMutation = useMutation({
    mutationFn: async (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      showSuccess("Task deleted successfully! 🗑️");
    },
    onError: () => {
      showError("Failed to delete task.");
    },
  });

  // ✅ Update Task
  const updateMutation = useMutation({
    mutationFn: async ({
      taskId,
      updatedData,
    }: {
      taskId: string;
      updatedData: ITask;
    }) => updateTask(taskId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
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
      showSuccess("Task added successfully! 🎉");
    },
    onError: () => {
      showError("Failed to add task.");
    },
  });

  const completeTaskMutation = useMutation({
    mutationFn: async (taskId: string) => markTaskAsDone(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      showSuccess("Task completed successfully! ✅");
    },
    onError: (error: any) => {
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
    mutationFn: async ({ taskId, days }: { taskId: string; days: number }) =>
      postponeTask(taskId, days),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
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
