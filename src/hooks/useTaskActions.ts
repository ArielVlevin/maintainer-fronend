import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask, updateTask, addTask } from "@/api/tasks";
import { ITask } from "@/types/ITask";

/**
 * Custom hook for managing task actions (delete, update, add).
 * Uses React Query's `useMutation` for caching optimizations.
 *
 * @returns {object} Mutation functions for task actions.
 */
export const useTaskActions = () => {
  const queryClient = useQueryClient();

  // ✅ מחיקת משימה עם עדכון המטמון
  const deleteMutation = useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: ["fetchData", false, true] });
      const previousData = queryClient.getQueryData(["fetchData", false, true]);

      queryClient.setQueryData(["fetchData", false, true], (oldData: any) => {
        if (!oldData || !oldData.tasksData) return oldData;
        return {
          ...oldData,
          tasksData: {
            ...oldData.tasksData,
            tasks: oldData.tasksData.tasks.filter(
              (task: any) => task._id !== taskId
            ),
            total: oldData.tasksData.total - 1,
          },
        };
      });

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchData", false, true] });
    },
    onError: (_error, _taskId, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["fetchData", false, true],
          context.previousData
        );
      }
    },
  });

  // ✅ עדכון משימה עם עדכון מטמון
  const updateMutation = useMutation({
    mutationFn: ({
      taskId,
      updatedData,
    }: {
      taskId: string;
      updatedData: any;
    }) => updateTask(taskId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchData", false, true] });
    },
  });

  // ✅ הוספת משימה עם עדכון מטמון
  const addMutation = useMutation({
    mutationFn: ({
      productId,
      newTaskData,
    }: {
      productId: string;
      newTaskData: ITask;
    }) => addTask(productId, newTaskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchData", false, true] });
    },
  });

  return {
    deleteMutation,
    updateMutation,
    addMutation,
  };
};
