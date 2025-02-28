"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IProduct } from "@/types/IProduct";
import { useImageUpload } from "@/hooks/use-image-upload";
import { useProducts } from "@/modules/products/hooks/useProduct";
import { useProductActions } from "./useProductActions";

interface UseProductFormProps {
  product_id?: string;
}

export function useProductForm({ product_id }: UseProductFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { addMutation, updateMutation } = useProductActions();
  const imageUploadProps = useImageUpload();

  // ✅ Memoized Empty Product
  const emptyProduct: IProduct = useMemo(
    () => ({
      _id: product_id,
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
    [product_id]
  );

  const [formData, setFormData] = useState<IProduct>(emptyProduct);
  const [isUploading, setIsUploading] = useState(false);

  // ✅ Fetch Existing Product if Editing
  const { data: product, isFetching } = useProducts({
    product_id,
    enabled: !!product_id, // Fetch only if `productId` exists
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

      return product_id
        ? updateMutation.mutateAsync({
            product_id,
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
