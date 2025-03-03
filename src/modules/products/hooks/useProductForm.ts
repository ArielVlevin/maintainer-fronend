"use client";

import { useEffect, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useProductActions } from "./useProductActions";
import { useProducts } from "@/modules/products/hooks/useProduct";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, ProductFormData } from "../schema/productFormSchema";
import { useImageUpload } from "@/hooks/use-image-upload";

interface UseProductFormProps {
  product_id?: string;
}

export function useProductForm({ product_id }: UseProductFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { addMutation, updateMutation } = useProductActions();
  const imageUploadProps = useImageUpload();

  // ברירות מחדל למוצר חדש
  const defaultValues: ProductFormData = useMemo(
    () => ({
      product_id: product_id || "",
      name: "",
      category: "",
      manufacturer: "",
      model: "",
      tags: [],
      purchaseDate: new Date(),
      lastOverallMaintenance: undefined,
      nextOverallMaintenance: undefined,
    }),
    [product_id]
  );

  const form = useForm<ProductFormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // אם עורך מוצר קיים - טען את הנתונים מהשרת
  const { data, isFetching } = useProducts({
    product_id,
    enabled: !!product_id,
  });

  useEffect(() => {
    if (product_id && data?.items[0]) {
      form.reset(data.items[0]);
    }
  }, [product_id, data, form]);

  // שליחת נתוני המוצר לשרת
  const mutation = useMutation({
    mutationFn: async (values: ProductFormData) => {
      const file = imageUploadProps.fileInputRef.current?.files?.[0];

      return product_id
        ? updateMutation.mutateAsync({
            product_id,
            updatedData: values,
            imageFile: file,
          })
        : addMutation.mutateAsync({
            newProductData: values,
            imageFile: file,
          });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      form.reset(defaultValues);
      router.push("/products");
    },
    onError: (error) => {
      console.error("❌ Error processing product:", error);
    },
  });

  return {
    form,
    mutation,
    isFetching,
    imageUploadProps,
  };
}
