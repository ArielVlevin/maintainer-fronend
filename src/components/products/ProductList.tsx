/**
 * `ProductList` Component
 *
 * This component displays a paginated list of products, allowing users to search, filter by category,
 * and delete products. It also provides pagination and category selection.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered product list.
 *
 * @dependencies
 * - `useQuery` from React Query for fetching products and categories.
 * - `useMutation` from React Query for handling product deletions.
 * - `fetchProducts`, `deleteProduct`, and `fetchCategories` API functions.
 * - `ProductCardPhone` component for displaying product items.
 * - `SearchDialog` component for searching products.
 * - `Skeleton_ProductCardPhone` component for loading state.
 *
 * @example
 * ```tsx
 * <ProductList />
 * ```
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, deleteProduct, fetchCategories } from "@/api/product";
import NoTasks from "../app-ui/NoTasks";
import { ProductCardPhone } from "../app-ui/card/ProductCardPhone";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IProduct } from "@/types";
import SearchDialog from "../common/SearchDialog";
import { Skeleton } from "../ui/skeleton";
import { Skeleton_ProductCardPhone } from "../app-ui/card/_Skeleton_ProductCardPhone";

export default function ProductList() {
  const queryClient = useQueryClient();
  const router = useRouter();

  // 🔹 State for pagination and category filtering
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(""); // Default: all categories

  // 🔹 Fetch categories from the server
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // 🔹 Fetch products based on selected filters
  const FETCH_SIZE = 6;
  const { data, error, isLoading } = useQuery({
    queryKey: ["products", page, category],
    queryFn: () => fetchProducts(page, FETCH_SIZE, category),
  });

  // 🔹 Mutation for deleting a product
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  if (error) {
    console.error("Error fetching products:", error);
    return <p className="text-red-500">❌ Error loading products</p>;
  }

  return (
    <div className="space-y-6">
      {/* 🔹 Search and Filtering */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <SearchDialog />

        {/* Category Selection */}
        <Select onValueChange={(value) => setCategory(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">📌 All</SelectItem>
            {isCategoriesLoading ? (
              <>
                <SelectItem value="loading" disabled>
                  <Skeleton className="h-4 w-32 rounded" />
                </SelectItem>
                <SelectItem value="loading2" disabled>
                  <Skeleton className="h-4 w-28 rounded" />
                </SelectItem>
                <SelectItem value="loading3" disabled>
                  <Skeleton className="h-4 w-36 rounded" />
                </SelectItem>
              </>
            ) : (
              categories?.map((cat: string) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      {/* 🔹 Displaying Product List */}
      {!isLoading && data?.products?.length === 0 ? (
        <NoTasks />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Skeleton_ProductCardPhone key={index} />
            ))
          ) : (
            <>
              {data?.products?.map((product: IProduct) => (
                <ProductCardPhone
                  key={product._id}
                  product={product}
                  onViewTasks={(id: string) =>
                    router.push(`/products/${id}/tasks`)
                  }
                  onDelete={(id: string) => deleteMutation.mutate(id)}
                />
              ))}
            </>
          )}
        </div>
      )}

      {/* 🔹 Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </Button>
        <span className="text-sm">
          Page {page} of {data?.totalPages ?? 1}
        </span>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= (data?.totalPages ?? 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
