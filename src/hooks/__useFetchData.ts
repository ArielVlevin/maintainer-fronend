import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/axios";
import { ITask } from "@/types/ITask";
import { IProduct } from "@/types/IProduct";

interface ProductsResponse {
  products: IProduct[];
  total: number;
  page: number;
  totalPages: number;
}

interface TasksResponse {
  tasks: ITask[];
  total: number;
  page: number;
  totalPages: number;
}
interface ProductWithTasksResponse {
  product: IProduct;
  tasks: ITask[];
}

/**
 * General hook for fetching products and/or tasks dynamically.
 *
 * @param {object} params - Query parameters.
 * @param {boolean} [params.fetchProducts=false] - If true, fetch products.
 * @param {boolean} [params.fetchTasks=false] - If true, fetch tasks.
 * @param {string} [params.productId] - Fetch a specific product (with tasks).
 * @param {number} [params.page=1] - Pagination page number.
 * @param {number} [params.limit=10] - Number of items per page.
 * @param {string} [params.search] - Search term for filtering.
 * @param {string} [params.category] - Product category filter.
 * @param {string[]} [params.fields] - Specific fields to retrieve.
 * @param {boolean} [params.userOnly=false] - Fetch only the current user's products/tasks.
 *
 * @returns {object} React Query object with `data`, `isLoading`, and `error`.
 */
export const __useFetchData = ({
  fetchProducts = false,
  fetchTasks = false,
  productId,
  page = 1,
  limit = 10,
  search,
  category,
  fields,
  userOnly = false,
}: {
  fetchProducts?: boolean;
  fetchTasks?: boolean;
  productId?: string;
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  fields?: string[];
  userOnly?: boolean;
}) => {
  return useQuery({
    queryKey: [
      "fetchData",
      fetchProducts,
      fetchTasks,
      productId,
      page,
      limit,
      search,
      category,
      userOnly,
    ],
    queryFn: async (): Promise<{
      productWithTasks?: ProductWithTasksResponse;
      productsData?: ProductsResponse;
      tasksData?: TasksResponse;
    }> => {
      const query = new URLSearchParams();
      query.append("page", page.toString());
      query.append("limit", limit.toString());
      if (userOnly) query.append("userOnly", "true");

      const requests: Array<
        Promise<{ data: ProductsResponse | TasksResponse }>
      > = [];

      if (fetchProducts && productId) {
        const { data } = await api.get<IProduct & { tasks: ITask[] }>(
          `/products/${productId}`
        );
        return { productWithTasks: { product: data, tasks: data.tasks } };
      }

      if (fetchProducts) {
        if (search) query.append("search", search);
        if (category && category !== "all") query.append("category", category);
        if (fields?.length) query.append("fields", fields.join(","));
        requests.push(
          api.get<ProductsResponse>(`/products?${query.toString()}`)
        );
      }

      if (fetchTasks) {
        requests.push(api.get<TasksResponse>(`/tasks?${query.toString()}`));
      }

      if (requests.length === 0) {
        throw new Error(
          "❌ Invalid use of useFetchData. Provide either fetchProducts or fetchTasks."
        );
      }

      const responses = await Promise.all(requests);

      let productsData: ProductsResponse | undefined;
      let tasksData: TasksResponse | undefined;

      if (fetchProducts) {
        productsData = responses.shift()?.data as ProductsResponse;
      }

      if (fetchTasks) {
        tasksData = responses.shift()?.data as TasksResponse;
      }

      return { productsData, tasksData };
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: fetchProducts || fetchTasks, // Execute only if fetching data
  });
};
