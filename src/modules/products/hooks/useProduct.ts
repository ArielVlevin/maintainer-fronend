import { fetchProducts } from "@/api/product";
import { useNotification } from "@/context/NotificationContext";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook for fetching products or a single product with its tasks.
 *
 * @param {object} params - Query parameters.
 * @returns {object} React Query object with `data`, `isLoading`, and `error`.
 */

export const useProducts = ({
  product_id,
  slug,
  page = 1,
  limit = 10,
  search,
  fields,
  category,
  userOnly = true,
  enabled = true,
}: {
  product_id?: string;
  slug?: string;
  page?: number;
  limit?: number;
  search?: string;
  fields?: string[];
  category?: string;
  userOnly?: boolean;
  enabled?: boolean;
}) => {
  const { showError } = useNotification();

  return useQuery({
    queryKey: [
      "products",
      product_id || null,
      slug || null,
      page,
      limit,
      search || null,
      fields ? fields.join(",") : null,
      category || null,
      userOnly,
    ],
    queryFn: async () => {
      try {
        return await fetchProducts({
          product_id,
          slug,
          search,
          fields,
          category,
          page,
          limit,
          userOnly,
        });
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        showError((error as Error).message || "Failed to load products.");
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!product_id || enabled,
  });
};
