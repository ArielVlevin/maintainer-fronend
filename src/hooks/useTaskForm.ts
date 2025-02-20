"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useFetchData } from "@/hooks/useFetchData";
import { useTaskActions } from "@/hooks/useTaskActions";
import { ITask } from "@/types/ITask";

interface UseTaskFormProps {
  product_id: string;
  taskId?: string;
}

export function useTaskForm({ product_id, taskId }: UseTaskFormProps) {
  const router = useRouter();

  // ✅ Fetch Existing Task (if editing)
  const { tasksData, isLoading: isFetching } = useFetchData({
    fetchTasks: !!taskId,
    taskId,
  });

  // ✅ Initial Form State
  const [formData, setFormData] = useState<ITask>({
    product_id,
    user_id: "",
    taskName: "",
    description: "",
    lastMaintenance: new Date(),
    frequency: 30,
    nextMaintenance: new Date(),
  });

  // ✅ Populate form when editing
  useEffect(() => {
    if (tasksData?.data?.[0]) {
      setFormData(tasksData?.data[0]);
    }
  }, [tasksData]);

  // ✅ Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Use `useTaskActions` for handling mutations
  const { addMutation, updateMutation } = useTaskActions();

  // ✅ Form Submit (Create or Update)
  const mutation = useMutation({
    mutationFn: async () => {
      return taskId
        ? updateMutation.mutateAsync({ taskId, updatedData: formData })
        : addMutation.mutateAsync({
            productId: product_id,
            newTaskData: formData,
          });
    },
    onSuccess: () => {
      router.push(`/product/${product_id}`);
    },
    onError: (error) => {
      console.error("❌ Error processing task:", error);
    },
  });

  return {
    formData,
    setFormData,
    mutation,
    isFetching,
    handleChange,
  };
}

/**
 * 
 * 
 * `useTaskForm` Hook
 *
 * A custom React hook for managing the task form state.
 * Handles both creating and updating tasks associated with a product.
 *
 * @param {Object} props - Hook props.
 * @param {string} props.product_id - The ID of the product to which the task belongs.
 * @param {string} [props.taskId] - The ID of the task to edit (if applicable).
 *
 * @returns {Object} The form state and handlers.
 * @returns {IMaintenanceTask} formData - The current state of the task form.
 * @returns {Function} setFormData - Function to manually update the form data.
 * @returns {Object} mutation - Mutation object for handling task submission.
 * @returns {boolean} isFetching - Indicates if the task data is being fetched.
 * @returns {Function} handleChange - Handles changes to input fields.
 *
 * @example
 * ```tsx
 * import { useTaskForm } from "@/hooks/useTaskForm";
 *
 * function TaskForm({ product_id, taskId }) {
 *   const { formData, handleChange, mutation } =
 *     useTaskForm({ product_id, taskId });
 *
 *   return (
 *     <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}>
 *       <input
 *         type="text"
 *         name="taskName"
 *         value={formData.taskName}
 *         onChange={handleChange}
 *       />
 *       <button type="submit">
 *         {taskId ? "Update Task" : "Create Task"}
 *       </button>
 *     </form>
 *   );
 * }
 * ```
 

"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTaskToProduct, fetchTaskById, updateTask } from "@/api/tasks";
import { useRouter } from "next/navigation";
import { ITask } from "@/types/ITask";

interface UseTaskFormProps {
  product_id: string;
  taskId?: string;
}

export function useTaskForm({ product_id, taskId }: UseTaskFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  // ✅ Initial Form State
  const [formData, setFormData] = useState<ITask>({
    product_id,
    user_id: "",
    taskName: "",
    description: "",
    lastMaintenance: new Date(),
    frequency: 30,
    nextMaintenance: new Date(),
  });

  // ✅ Fetch Existing Task (if editing)
  const { data: task, isFetching } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => (taskId ? fetchTaskById(taskId) : null),
    enabled: !!taskId,
  });

  // ✅ Populate form when editing
  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  // ✅ Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Form Submission (Create or Update)
  const mutation = useMutation({
    mutationFn: async () => {
      if (taskId) {
        // ✅ Update existing task
        return await updateTask(taskId, formData);
      } else {
        // ✅ Add new task to product
        return await addTaskToProduct(product_id, formData);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", product_id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });

      setFormData({
        product_id,
        user_id: "",
        taskName: "",
        description: "",
        lastMaintenance: new Date(),
        frequency: 30,
        nextMaintenance: new Date(),
      });

      router.push(`/product/${product_id}`);
    },
    onError: (error) => {
      console.error("❌ Error processing task:", error);
    },
  });

  return {
    formData,
    setFormData,
    mutation,
    isFetching,
    handleChange,
  };
}
*/
