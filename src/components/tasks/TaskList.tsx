/**
 * `TaskList` Component
 *
 * This component displays a list of maintenance tasks associated with a specific product.
 * It retrieves tasks using React Query and allows task deletion.
 *
 * @component
 *
 * @param {Object} props - Component properties.
 * @param {string} props.productId - The ID of the product whose tasks should be displayed.
 *
 * @returns {JSX.Element} The rendered list of tasks.
 *
 * @dependencies
 * - `useQuery` from React Query for fetching product tasks.
 * - `useMutation` from React Query for handling task deletions.
 * - `fetchProductTasks` API function to fetch tasks.
 * - `deleteTask` API function to delete a task.
 *
 * @example
 * ```tsx
 * <TaskList productId="123456789" />
 * ```
 */

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProductTasks } from "@/api/product";
import { IMaintenanceTask } from "@/types";
import { TaskCard } from "./TaskCard";
import NoTasks from "../app-ui/NoTasks";
import { deleteTask } from "@/api/tasks";

interface TaskListProps {
  productId: string;
}

export default function TaskList({ productId }: TaskListProps) {
  const queryClient = useQueryClient();

  // Fetch tasks associated with the given product ID
  const {
    data: tasks,
    error,
    isLoading,
  } = useQuery<IMaintenanceTask[]>({
    queryKey: ["tasks", productId],
    queryFn: () => fetchProductTasks(productId),
  });

  // Mutation for deleting a task and invalidating related queries
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", productId] }); // Refresh tasks list
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Refresh product details
    },
  });

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-red-500">❌ Error loading tasks</p>;

  return (
    <>
      {/* Show "No Tasks" if there are no tasks */}
      {tasks?.length === 0 ? (
        <NoTasks />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks?.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onTakeCare={(id) => console.log(`Task ${id} marked as done`)} // ✅ Placeholder function
              // onEdit={(id) => console.log(`Editing task ${id}`)} // ✅ Placeholder function
              onDelete={(id) => deleteMutation.mutate(id)}
            />
          ))}
        </div>
      )}
    </>
  );
}
