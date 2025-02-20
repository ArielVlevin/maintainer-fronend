import { fetchProducts } from "@/api/product";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook for fetching products or a single product with its tasks.
 *
 * @param {object} params - Query parameters.
 * @returns {object} React Query object with `data`, `isLoading`, and `error`.
 */

export const useProducts = ({
  productId,
  page = 1,
  limit = 10,
  search,
  fields,
  category,
  userOnly = false,
  enabled = true,
}: {
  productId?: string;
  page?: number;
  limit?: number;
  search?: string;
  fields?: string[];
  category?: string;
  userOnly?: boolean;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: [
      "products",
      productId,
      page,
      limit,
      search,
      fields,
      category,
      userOnly,
    ],
    queryFn: () =>
      fetchProducts({ productId, page, limit, search, category, userOnly }),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: !!productId || enabled, // Ensure execution when necessary
  });
};
