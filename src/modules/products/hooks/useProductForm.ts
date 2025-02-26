"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IProduct } from "@/types/IProduct";
import { useImageUpload } from "@/hooks/use-image-upload";
import { useProducts } from "@/modules/products/hooks/useProduct";
import { useProductActions } from "./useProductActions";

interface UseProductFormProps {
  productId?: string;
}

export function useProductForm({ productId }: UseProductFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { addMutation, updateMutation } = useProductActions();
  const imageUploadProps = useImageUpload();

  // ✅ Memoized Empty Product
  const emptyProduct: IProduct = useMemo(
    () => ({
      name: "",
      slug: "",
      category: "",
      manufacturer: "",
      user_id: "",
      model: "",
      tags: [],
      purchaseDate: new Date(),
      tasks: [],
      lastOverallMaintenance: undefined,
      nextOverallMaintenance: undefined,
    }),
    []
  );

  const [formData, setFormData] = useState<IProduct>(emptyProduct);
  const [isUploading, setIsUploading] = useState(false);

  // ✅ Fetch Existing Product if Editing
  const { data: product, isFetching } = useProducts({
    productId,
    enabled: !!productId, // Fetch only if `productId` exists
  });

  // ✅ Populate form when editing
  useEffect(() => {
    if (product?.items[0]) {
      setFormData((prev) => ({
        ...prev,
        ...product.items[0],
        tags: Array.isArray(product.items[0].tags) ? product.items[0].tags : [],
      }));
    }
  }, [product]);

  // ✅ Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Tags Change (string -> array)
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      tags: e.target.value.split(",").map((tag) => tag.trim()),
    }));
  };

  // ✅ Determine if creating or updating
  const mutation = useMutation({
    mutationFn: async () => {
      setIsUploading(true);
      const file = imageUploadProps.fileInputRef.current?.files?.[0];

      return productId
        ? updateMutation.mutateAsync({
            productId,
            updatedData: formData,
            imageFile: file,
          })
        : addMutation.mutateAsync({
            newProductData: formData,
            imageFile: file,
          });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setFormData(emptyProduct); // Reset form after success
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
    isSubmitting: addMutation.isPending || updateMutation.isPending,
  };
}

/*
interface UseProductFormProps {
  productId?: string;
}

export function useProductForm({ productId }: UseProductFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { addMutation, updateMutation } = useProductActions();

  // ✅ Initial Form State
  const emptyProduct: IProduct = useMemo(
    () => ({
      name: "",
      category: "",
      manufacturer: "",
      user_id: "",
      model: "",
      tags: [],
      purchaseDate: new Date(),
      Tasks: [],
      lastOverallMaintenance: undefined,
      nextOverallMaintenance: undefined,
    }),
    []
  );

  const [formData, setFormData] = useState<IProduct>(emptyProduct);

  const [isUploading, setIsUploading] = useState(false);
  const imageUploadProps = useImageUpload();

  // ✅ Fetch Existing Product (if editing)
  const { data: product, isFetching } = useProducts({
    productId,
    enabled: !!productId,
  });

  // ✅ Populate form when editing
  useEffect(() => {
    if (product && product.data[0]) {
      setFormData((prev) => ({
        ...prev, // Preserve previous state if necessary
        ...product.data[0], // Spread only if product exists
        tags: Array.isArray(product.data[0].tags) ? product.data[0].tags : [],
      }));
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
        Tasks: [],
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
    isSubmitting: addMutation.isPending || updateMutation.isPending,
  };
} /**
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
 

"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    queryFn: async () => {
      if (!productId) return Promise.resolve(null);
      return fetchProductById(productId);
    },
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


*/
