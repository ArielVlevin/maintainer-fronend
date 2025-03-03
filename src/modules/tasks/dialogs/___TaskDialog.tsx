/**
 * TaskDialog Component
 *
 * This component renders a dialog for adding or editing a maintenance task.
 * It integrates with the useTaskForm hook to manage form state and handle task mutations.
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
 * - useTaskForm foֿֿr managing task form state and submitting changes.
 * - FormDialog for the modal UI.
 * - TaskFields for task input fields.
 *
 * @example
 * tsx
 * <TaskDialog product_id="123" open={true} onClose={() => setOpen(false)} />
 *
 */

"use client";

import { IProduct } from "@/types/IProduct";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { useTaskForm } from "@/modules/tasks/hooks/___useTaskForm";
import { useProducts } from "@/modules/products/hooks/useProduct";

import TaskFields from "@/modules/tasks/components/___TaskField";
import FormDialog from "@/components/dialog/FormDialog";
import FormSelect from "@/components/input/FormSelect";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Plus } from "lucide-react";

interface TaskDialogProps {
  product_id?: string;
  task_id?: string;
  date?: Date;
  open: boolean;
  onClose: () => void;
}

export default function TaskDialog({
  product_id,
  task_id,
  date,
  open,
  onClose,
}: TaskDialogProps) {
  const { user } = useAuth();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<
    string | number | undefined
  >(product_id ? product_id : undefined);

  const { data, isLoading } = useProducts({});

  const { formData, handleChange, mutation } = useTaskForm({
    product_id: selectedProduct as string,
    task_id,
    date,
  });

  useEffect(() => {
    if (open && user?._id && !isLoading) {
      const productsData = data?.items;
      setProducts(productsData || []);
    }
  }, [isLoading, open, data, user]);

  return (
    <FormDialog
      title={task_id ? "Edit Task" : "Add Task"}
      open={open}
      onClose={onClose}
      onConfirm={() => {
        if (!selectedProduct) return;
        mutation.mutate();
        onClose();
      }}
      confirmText={task_id ? "Save Changes" : "Add Task"}
    >
      {/* Product Selection Dropdown */}
      {!product_id && (
        <>
          <FormSelect
            label="Select Product"
            name="product"
            value={selectedProduct as string}
            onChange={(value) => setSelectedProduct(value)}
            disabled={!user?._id || isLoading}
            options={products.map((product) => ({
              label: product.name,
              value: product._id ? String(product._id) : "",
            }))}
          />
        </>
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
  date?: Date;
}

export function AddTaskButton({
  productId,
  date,
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
        date={date}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}
