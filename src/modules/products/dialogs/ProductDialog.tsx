import { FormProvider } from "react-hook-form";
import { useProductForm } from "@/modules/products/hooks/useProductForm";
import FormDialog from "@/components/dialog/FormDialog";
import ProductFields from "../components/ProductFields";

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
  const { form, mutation, isSubmitting } = useProductForm({
    product_id,
  });

  return (
    <FormProvider {...form}>
      <FormDialog
        title={product_id ? "Edit Product" : "Add Product"}
        open={open}
        onClose={onClose}
        onConfirm={form.handleSubmit((values) => {
          console.log("form: ", form.getValues());
          mutation.mutate(values, {
            onSuccess: () => onClose(),
          });
        })}
        confirmText={
          isSubmitting
            ? "Processing..."
            : product_id
            ? "Save Changes"
            : "Add Product"
        }
        disabled={isSubmitting}
      >
        <ProductFields />
      </FormDialog>
    </FormProvider>
  );
}
