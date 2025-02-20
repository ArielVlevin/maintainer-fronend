import { ProductsResponse, TasksResponse } from "@/types/ApiResponse";
import { useProducts } from "./useProductFetch";
import { useTasks } from "./useTaskFetch";

interface FetchDataParams {
  fetchProducts?: boolean;
  fetchTasks?: boolean;
  productId?: string;
  productPage?: number;
  productLimit?: number;
  taskId?: string;
  taskPage?: number;
  taskLimit?: number;
  search?: string;
  category?: string;
  fields?: string[];
  status?: string;
  userOnly?: boolean;
}

export const useFetchData = ({
  fetchProducts = false,
  fetchTasks = false,
  productId,
  productPage = 1,
  productLimit = 10,
  taskId,
  taskPage = 1,
  taskLimit = 10,
  search,
  category,
  fields,
  status,
  userOnly = true,
}: FetchDataParams) => {
  // Fetch Products
  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useProducts({
    productId,
    page: productPage,
    limit: productLimit,
    search,
    category,
    fields,
    userOnly,
    enabled: fetchProducts,
  });

  // Fetch Tasks
  const {
    data: tasksData,
    isLoading: isTasksLoading,
    isError: isTasksError,
  } = useTasks({
    productId,
    taskId,
    page: taskPage,
    limit: taskLimit,
    search,
    status,
    enabled: fetchTasks,
  });

  return {
    productsData: fetchProducts
      ? (productsData as ProductsResponse)
      : undefined,
    tasksData: fetchTasks ? (tasksData as TasksResponse) : undefined,
    isLoading: isProductsLoading || isTasksLoading,
    isError: isProductsError || isTasksError,
  };
};
