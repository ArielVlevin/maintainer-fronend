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

import { useProductForm } from "@/modules/products/hooks/__useProductForm";
import ProductFields from "@/modules/products/components/___ProductField";
import FormDialog from "@/components/dialog/FormDialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface ProductDialogProps {
  product_id?: string;
  open: boolean;
  onClose: () => void;
}

export default function ProductDialog({
  product_id,
  open,
  onClose,
}: ProductDialogProps) {
  const { formData, handleChange, mutation, isSubmitting, imageUploadProps } =
    useProductForm({
      product_id,
    });

  return (
    <FormDialog
      title={product_id ? "Edit Product" : "Add Product"}
      open={open}
      onClose={onClose}
      onConfirm={() => {
        mutation.mutate();
        onClose();
      }}
      confirmText={
        isSubmitting
          ? "Processing..."
          : product_id
          ? "Save Changes"
          : "Add Product"
      }
      disabled={isSubmitting} // Disable button while submitting
    >
      <ProductFields
        formData={formData}
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
