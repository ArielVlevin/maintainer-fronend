import { IProduct } from "./IProduct";
import { ITask } from "./ITask";

/**
 * Generic interface for paginated API responses.
 *
 * @template T - Type of data being paginated.
 */
export interface PaginatedResponse<T> {
  success?: boolean; // ✅ Indicates if the request was successful
  items: T[]; // ✅ List of items
  total: number; // ✅ Total count of items in the database
  page: number; // ✅ Current page number
  totalPages: number; // ✅ Total number of pages
  message?: string; // ✅ Optional message (for errors or additional info)
}

/**
 * Response format for fetching products with pagination.
 */
export interface ProductsResponse extends PaginatedResponse<IProduct> {}

/**
 * Response format for fetching tasks with pagination.
 */
export interface TasksResponse extends PaginatedResponse<ITask> {}
