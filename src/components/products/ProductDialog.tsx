/**
 * @component ProductDialog
 * @description A dialog for adding or editing a product. It is a controlled component
 * that receives `open` and `onClose` props from the parent.
 *
 * @param {string} [productId] - If provided, the dialog functions as an "Edit Product" form;
 * otherwise, it is used for adding a new product.
 * @param {boolean} open - Controls whether the dialog is visible.
 * @param {() => void} onClose - Function to close the dialog.
 *
 * @returns {JSX.Element} The rendered product dialog component.
 */

import { useProductForm } from "@/hooks/useProductForm";
import ProductFields from "./ProductField";
import FormDialog from "../common/FormDialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface ProductDialogProps {
  productId?: string;
  open: boolean; //
  onClose: () => void;
}

export default function ProductDialog({
  productId,
  open,
  onClose,
}: ProductDialogProps) {
  // Custom hook for managing product form state and actions
  const { formData, handleChange, mutation, imageUploadProps } = useProductForm(
    { productId }
  );
  const formattedFormData = {
    ...formData,
    tags: Array.isArray(formData.tags)
      ? formData.tags.join(", ")
      : formData.tags || "",
  };

  return (
    <FormDialog
      title={productId ? "Edit Product" : "Add Product"}
      open={open}
      onClose={onClose}
      onConfirm={() => {
        mutation.mutate(); // Executes the mutation (either create or update)
        onClose(); // Closes the dialog after submission
      }}
      confirmText={productId ? "Save Changes" : "Add Product"}
    >
      <ProductFields
        formData={formattedFormData}
        handleChange={handleChange}
        imageUploadProps={imageUploadProps}
      />
    </FormDialog>
  );
}

/**
 * @component AddProductButton
 * @description A full-width button that opens the `ProductDialog` to add a new product.
 *
 * @returns {JSX.Element} The Add Product Button UI.
 */

interface AddProductButtonProps {
  className?: string;
}
export function AddProductButton({
  className = "flex items-center",
}: AddProductButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button className={cn(className)} onClick={() => setIsDialogOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        New Product
      </Button>
      <ProductDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}
