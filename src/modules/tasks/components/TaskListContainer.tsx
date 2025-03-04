"use client";

import { useState } from "react";
import TaskList from "./TaskList";
import TaskListSkeleton from "../styles/TaskListSkeleton";
import { useTasks } from "@/modules/tasks/hooks/useTask";
import { NoTasksMessage } from "./NoTasksMessage";
import { ITask } from "@/types/ITask";
import ConfirmDeleteDialog from "@/components/dialog/ConfirmDeleteDialog";
import { useTaskActions } from "@/modules/tasks/hooks/useTaskActions";
import { PostponeTaskDialog } from "../dialogs/PostponeTaskDialog";
import { IProduct } from "@/types/IProduct";
import { useNotification } from "@/context/NotificationContext";
import { AddTaskButton } from "../dialogs/AddTaskButton";
import TaskDialog from "../dialogs/TaskDialog";
import Pagination from "@/components/table/Pagination";

/**
 * @component TaskListContainer
 * @description Fetches and manages the state of the task list.
 *
 * @param {object} props - Component props.
 * @param {string} [props.productId] - If provided, fetches tasks for a specific product.
 */
export default function TaskListContainer({
  header = "Tasks",
  product,
  dropMenu = false,
  enableSearch = false,
  paginationControls = true,
}: {
  header?: string;
  product?: IProduct;
  dropMenu?: boolean;
  enableSearch?: boolean;
  paginationControls?: boolean;
}) {
  const { showError } = useNotification();
  const { deleteMutation, completeTaskMutation, postponeTaskMutation } =
    useTaskActions();

  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isPostponeDialogOpen, setPostponeDialogOpen] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error } = useTasks({
    product_id: product?._id,
    page,
    limit,
  });

  if (isLoading) return <TaskListSkeleton />;
  if (isError) showError(error?.message || "Failed to load tasks.");
  if (!data || data.total === 0) return <NoTasksMessage />;

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{header}</h2>
        <AddTaskButton productId={product?._id} />
      </div>

      <TaskList
        tasks={data?.items || []}
        product={product}
        enableSearch={enableSearch}
        dropMenu={dropMenu}
        onEdit={(task) => {
          setSelectedTask(task);
          setEditDialogOpen(true);
        }}
        onDelete={(task) => {
          setSelectedTask(task);
          setDeleteDialogOpen(true);
        }}
        onComplete={(task) => {
          completeTaskMutation.mutate(task._id!);
        }}
        onPostpone={(task) => {
          setSelectedTask(task);
          setPostponeDialogOpen(true);
        }}
      />

      {/* Pagination Controls */}
      {paginationControls && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
        /*
        <div className="flex justify-center mt-4">
          <button
            className="mr-2 px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2">{`Page ${page} of ${data?.totalPages}`}</span>
          <button
            className="ml-2 px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= (data?.totalPages || 1)}
          >
            Next
          </button>
        </div>*/
      )}

      <ConfirmDeleteDialog
        title="Confirm Deletion"
        description="This action cannot be undone. To confirm, type:"
        confirmText={selectedTask?.taskName || "Delete"}
        onConfirm={() => {
          if (selectedTask) {
            deleteMutation.mutate(selectedTask._id!);
          }
          setSelectedTask(null);
          setDeleteDialogOpen(false);
        }}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />

      {selectedTask && (
        <TaskDialog
          product_id={product?._id}
          task_id={selectedTask._id}
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
        />
      )}
      {selectedTask && (
        <PostponeTaskDialog
          taskId={selectedTask._id || ""}
          open={isPostponeDialogOpen}
          onClose={() => setPostponeDialogOpen(false)}
          onPostpone={(task_id, days) =>
            postponeTaskMutation.mutate({ task_id, days })
          }
        />
      )}
    </>
  );
}
