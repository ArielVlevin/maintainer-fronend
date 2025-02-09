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
