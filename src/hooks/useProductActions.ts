import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, updateProduct, addProduct } from "@/api/product";
import { IProduct } from "@/types/IProduct";

/**
 * Custom hook for managing product actions (delete, update, add).
 * Uses React Query's `useMutation` for caching optimizations.
 *
 * @returns {object} Mutation functions for product actions.
 */
export const useProductActions = () => {
  const queryClient = useQueryClient();

  // ✅ Delete Product with Cache Update
  const deleteMutation = useMutation({
    mutationFn: async (productId: string) => deleteProduct(productId),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      const previousData = queryClient.getQueryData(["products"]);

      queryClient.setQueryData(["products"], (oldData: any) => {
        if (!oldData?.products) return oldData;
        return {
          ...oldData,
          products: oldData.products.filter(
            (product: IProduct) => product._id !== productId
          ),
          total: oldData.total - 1,
        };
      });

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (_error, _productId, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData(["products"], context.previousData);
      }
    },
  });

  // ✅ Update Product with Image Upload
  const updateMutation = useMutation({
    mutationFn: async ({
      productId,
      updatedData,
      imageFile,
    }: {
      productId: string;
      updatedData: IProduct;
      imageFile?: File;
    }) => updateProduct(productId, updatedData, imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // ✅ Add Product with Image Upload
  const addMutation = useMutation({
    mutationFn: async ({
      newProductData,
      imageFile,
    }: {
      newProductData: IProduct;
      imageFile?: File;
    }) => addProduct(newProductData, imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    deleteMutation,
    updateMutation,
    addMutation,
  };
};
