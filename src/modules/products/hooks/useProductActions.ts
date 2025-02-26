import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IProduct } from "@/types/IProduct";
import { useErrorHandler } from "@/context/ErrorContext";
import { addProduct, deleteProduct, updateProduct } from "@/api/product";

/**
 * Custom hook for managing product actions (delete, update, add).
 */
export const useProductActions = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useErrorHandler();

  // ✅ Delete Product
  const deleteMutation = useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showSuccess("Product deleted successfully! 🗑️");
    },
    onError: () => {
      showError("Failed to delete product.");
    },
  });

  // ✅ Update Product
  const updateMutation = useMutation({
    mutationFn: async ({
      productId,
      updatedData,
      imageFile,
    }: {
      productId: string;
      updatedData: IProduct;
      imageFile?: File;
    }) => updateProduct(productId, updatedData, imageFile), // 🛠️ שימוש בפונקציה מה-API

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showSuccess("Product updated successfully! ✨");
    },
    onError: () => {
      showError("Failed to update product.");
    },
  });

  // ✅ Add Product
  const addMutation = useMutation({
    mutationFn: async ({
      newProductData,
      imageFile,
    }: {
      newProductData: IProduct;
      imageFile?: File;
    }) => addProduct(newProductData, imageFile), // 🛠️ שימוש בפונקציה מה-API

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showSuccess("Product added successfully! 🎉");
    },
    onError: () => {
      showError("Failed to add product.");
    },
  });

  return {
    deleteMutation,
    updateMutation,
    addMutation,
  };
};
