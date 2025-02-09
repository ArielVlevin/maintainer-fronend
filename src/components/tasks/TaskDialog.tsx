/**
 * `TaskDialog` Component
 *
 * This component renders a dialog for adding or editing a maintenance task.
 * It integrates with the `useTaskForm` hook to manage form state and handle task mutations.
 *
 * @component
 *
 * @param {string} product_id - The ID of the product to which the task belongs.
 * @param {string} [taskId] - (Optional) The ID of the task to edit; if undefined, a new task will be created.
 * @param {boolean} open - Controls whether the dialog is open.
 * @param {Function} onClose - Function to handle closing the dialog.
 *
 * @returns {JSX.Element} The rendered task dialog.
 *
 * @dependencies
 * - `useTaskForm` for managing task form state and submitting changes.
 * - `FormDialog` for the modal UI.
 * - `TaskFields` for task input fields.
 *
 * @example
 * ```tsx
 * <TaskDialog product_id="123" open={true} onClose={() => setOpen(false)} />
 * ```
 */

"use client";

import { useTaskForm } from "@/hooks/useTaskForm";
import FormDialog from "../common/FormDialog";
import TaskFields from "./TaskField";

interface TaskDialogProps {
  product_id: string;
  taskId?: string;
  open: boolean;
  onClose: () => void;
}

export default function TaskDialog({
  product_id,
  taskId,
  open,
  onClose,
}: TaskDialogProps) {
  const { formData, handleChange, mutation } = useTaskForm({
    product_id,
    taskId,
  });

  return (
    <FormDialog
      title={taskId ? "Edit Task" : "Add Task"}
      open={open}
      onClose={onClose}
      onConfirm={() => {
        mutation.mutate();
        onClose();
      }}
      confirmText={taskId ? "Save Changes" : "Add Task"}
    >
      <TaskFields formData={formData} handleChange={handleChange} />
    </FormDialog>
  );
}
