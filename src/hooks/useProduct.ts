import { fetchProducts } from "@/api/product";
import { useErrorHandler } from "@/context/ErrorContext";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook for fetching products or a single product with its tasks.
 *
 * @param {object} params - Query parameters.
 * @returns {object} React Query object with `data`, `isLoading`, and `error`.
 */

export const useProducts = ({
  productId,
  slug,
  page = 1,
  limit = 10,
  search,
  fields,
  category,
  userOnly = true,
  enabled = true,
}: {
  productId?: string;
  slug?: string;
  page?: number;
  limit?: number;
  search?: string;
  fields?: string[];
  category?: string;
  userOnly?: boolean;
  enabled?: boolean;
}) => {
  const { showError } = useErrorHandler();

  return useQuery({
    queryKey: [
      "products",
      productId,
      slug,
      page,
      limit,
      search,
      fields,
      category,
      userOnly,
    ],
    queryFn: async () => {
      try {
        return await fetchProducts({
          productId,
          slug,
          search,
          fields,
          category,
          page,
          limit,
          userOnly,
        });
      } catch (error: any) {
        console.error("❌ Error fetching products:", error);
        showError(error.message || "Failed to load products.");
        throw error; //
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!productId || enabled,
  });
};
