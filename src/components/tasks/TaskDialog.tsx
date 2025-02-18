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
 * - `useTaskForm` foֿֿr managing task form state and submitting changes.
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
import { useEffect, useState } from "react";
import { fetchUserProducts } from "@/api/product";
import { useAuth } from "@/context/authContext";
import { IProduct } from "@/types/IProduct";

import FormSelect from "../app-ui/FormSelect";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskDialogProps {
  product_id?: string;
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
  const { user } = useAuth();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<
    string | number | undefined
  >(product_id ? product_id : undefined);

  // Fetch user products when dialog opens
  useEffect(() => {
    if (open && user?._id) {
      fetchUserProducts().then((data) => {
        setProducts(data.products);
      });
    }
  }, [open, user]);

  // Initialize task form only if a product is selected
  const { formData, handleChange, mutation } = useTaskForm({
    product_id: selectedProduct as string,
    taskId,
  });

  return (
    <FormDialog
      title={taskId ? "Edit Task" : "Add Task"}
      open={open}
      onClose={onClose}
      onConfirm={() => {
        if (!selectedProduct) return;
        mutation.mutate();
        onClose();
      }}
      confirmText={taskId ? "Save Changes" : "Add Task"}
    >
      {/* Product Selection Dropdown */}
      {!product_id && (
        <FormSelect
          label="Select Product"
          name="product"
          value={selectedProduct as string}
          onChange={(value) => setSelectedProduct(value)}
          options={products.map((product) => ({
            label: product.name,
            value: product._id ? String(product._id) : "",
          }))}
        />
      )}

      {/* Task Fields */}
      {selectedProduct && (
        <TaskFields formData={formData} handleChange={handleChange} />
      )}
    </FormDialog>
  );
}

interface AddTaskButtonProps {
  productId?: string;
  className?: string;
}

export function AddTaskButton({
  productId,
  className = "flex items-center",
}: AddTaskButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button className={cn(className)} onClick={() => setIsDialogOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        New Task
      </Button>

      {/* ✅ Task Dialog for Adding a New Task */}
      <TaskDialog
        product_id={productId}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}
