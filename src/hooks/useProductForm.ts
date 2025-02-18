/**
 * `useProductForm` Hook
 *
 * A custom React hook for managing the product form state.
 * Handles both creating and updating a product, including image uploads.
 *
 * @param {Object} props - Hook props.
 * @param {string} [props.productId] - The ID of the product to edit (if applicable).
 *
 * @returns {Object} The form state and handlers.
 * @returns {IProduct} formData - The current state of the product form.
 * @returns {Function} setFormData - Function to manually update the form data.
 * @returns {Object} mutation - Mutation object for handling product submission.
 * @returns {boolean} isFetching - Indicates if the product data is being fetched.
 * @returns {boolean} isUploading - Indicates if an image is being uploaded.
 * @returns {Function} handleChange - Handles changes to input fields.
 * @returns {Function} handleTagsChange - Handles changes to the tags field (converts string to array).
 * @returns {Object} imageUploadProps - Contains functions and refs for handling image uploads.
 *
 * @example
 * ```tsx
 * import { useProductForm } from "@/hooks/useProductForm";
 *
 * function ProductForm({ productId }) {
 *   const { formData, handleChange, mutation, imageUploadProps } =
 *     useProductForm({ productId });
 *
 *   return (
 *     <form onSubmit={mutation.mutate}>
 *       <input
 *         type="text"
 *         name="name"
 *         value={formData.name}
 *         onChange={handleChange}
 *       />
 *       <button type="submit">
 *         {productId ? "Update Product" : "Create Product"}
 *       </button>
 *     </form>
 *   );
 * }
 * ```
 */

"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProduct, fetchProductById, updateProduct } from "@/api/product";
import { useRouter } from "next/navigation";
import { IProduct } from "@/types/IProduct";
import { useImageUpload } from "@/hooks/use-image-upload";

interface UseProductFormProps {
  productId?: string;
}

export function useProductForm({ productId }: UseProductFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  // ✅ Initial Form State
  const [formData, setFormData] = useState<IProduct>({
    name: "",
    category: "",
    manufacturer: "",
    user_id: "",
    model: "",
    tags: [],
    purchaseDate: new Date(),
    maintenanceTasks: [],
  });

  const [isUploading, setIsUploading] = useState(false);
  const imageUploadProps = useImageUpload();

  // ✅ Fetch Existing Product (if editing)
  const { data: product, isFetching } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => (productId ? fetchProductById(productId) : null),
    enabled: !!productId,
  });

  // ✅ Populate form when editing
  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        tags: Array.isArray(product.tags) ? product.tags : [],
      });
    }
  }, [product]);

  // ✅ Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Tags Change (string -> array)
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsArray = e.target.value.split(",").map((tag) => tag.trim());
    setFormData((prev) => ({ ...prev, tags: tagsArray }));
  };

  // ✅ Form Submit (Create or Update)
  const mutation = useMutation({
    mutationFn: async () => {
      setIsUploading(true);
      const file = imageUploadProps.fileInputRef.current?.files?.[0];

      if (productId) {
        // ✅ Update product
        return await updateProduct(productId, formData, file || undefined);
      } else {
        // ✅ Create product
        return await addProduct(formData, file || undefined);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setFormData({
        name: "",
        category: "",
        manufacturer: "",
        user_id: "",
        model: "",
        tags: [],
        purchaseDate: new Date(),
        maintenanceTasks: [],
      });
      setIsUploading(false);
      router.push("/products");
    },
    onError: (error) => {
      console.error("❌ Error processing product:", error);
    },
  });

  return {
    formData,
    setFormData,
    mutation,
    isFetching,
    isUploading,
    handleChange,
    handleTagsChange,
    imageUploadProps,
  };
}
