"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProduct, fetchProductById } from "@/api/product";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormField from "../app-ui/FormField";

import { useImageUpload } from "@/hooks/use-image-upload";
import Avatar from "../img/Avatar";
import { IProduct } from "@/types";

interface ProductFormProps {
  productId?: string;
}

export default function ProductForm({ productId }: ProductFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [formData, setFormData] = useState<IProduct>({
    name: "",
    category: "",
    manufacturer: "",
    model: "",
    tags: "",
    purchaseDate: new Date(), // ✅ Ensure this is a valid date string
    maintenanceTasks: [],
  });

  const [isUploading, setIsUploading] = useState(false);
  const imageUploadProps = useImageUpload();

  const mutation = useMutation({
    mutationFn: async () => {
      setIsUploading(true);

      const file = imageUploadProps.fileInputRef.current?.files?.[0];

      return await addProduct(
        {
          ...formData,
        },
        file || undefined
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setFormData({
        name: "",
        category: "",
        manufacturer: "",
        model: "",
        tags: "",
        purchaseDate: new Date(),
        maintenanceTasks: [],
      });
      setIsUploading(false);
      router.push("/products");
    },
    onError: (error) => {
      console.error("❌ Error adding product:", error);
    },
  });

  // ✅ Fetch Product Data if Editing
  const { data: product, isFetching } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => (productId ? fetchProductById(productId) : null),
    enabled: !!productId, // Fetch only if editing
  });

  // ✅ Update Form with Existing Data
  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        tags: Array.isArray(product.tags)
          ? product.tags.join(", ")
          : product.tags || "", // Convert array to a string
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  //<ProfileBg defaultImage="/profile-bg.jpg" />

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        {productId ? (
          <CardTitle>Edit Product</CardTitle>
        ) : (
          <CardTitle>Add Product</CardTitle>
        )}
      </CardHeader>
      <CardContent>
        {isFetching ? (
          <>fetching</>
        ) : (
          <>
            <div className="overflow-y-auto">
              <Avatar {...imageUploadProps} prevImage="dfsfds" />
              <div className="px-6 pb-6 pt-4">
                <form className="space-y-4"></form>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate();
              }}
              className="space-y-4 w-full"
            >
              <FormField
                label="name"
                type="text"
                name="name"
                placeholder="שם המוצר"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <FormField
                label="category"
                type="text"
                name="category"
                value={formData.category as string}
                onChange={handleChange}
              />
              <FormField
                label="manufacturer"
                type="text"
                name="manufacturer"
                value={formData.manufacturer as string}
                onChange={handleChange}
              />
              <FormField
                label="model"
                type="text"
                name="model"
                value={formData.model as string}
                onChange={handleChange}
              />
              <FormField
                label="Tags"
                type="text"
                name="tags"
                value={formData.tags as string}
                onChange={handleChange}
              />
              <FormField
                label="Purchase Date"
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
              />
              <div className="w-1/2">
                <div className=" justify-end gap-2 w-full ">
                  <Button
                    variant={"outline"}
                    className="w-1/3"
                    onClick={() => {
                      router.push("/products");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={mutation.isPending || isUploading}
                    className="w-2/3"
                  >
                    {mutation.isPending ? "Adding..." : "Add"}
                  </Button>
                </div>
              </div>
            </form>
          </>
        )}
      </CardContent>
    </Card>
  );
}
