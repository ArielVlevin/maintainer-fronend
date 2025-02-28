/**
 * Generic base interface for API responses.
 *
 * @template T - Type of data being returned.
 */
export interface BaseResponse<T> {
  success?: boolean; // ✅ Indicates if the request was successful
  items: T[]; // ✅ List of items
  total: number; // ✅ Total count of items in the database
  page: number; // ✅ Current page number
  totalPages: number; // ✅ Total number of pages
  message?: string; // ✅ Optional message (for errors or additional info)
}

/**
 * Generic base interface for API responses.
 *
 * @template T - Type of data being returned.
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | BaseResponse<T> | null;
  error?: string;
}
