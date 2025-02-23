import { BaseResponse } from "@/types/ApiResponse";
import { api } from "./axios";

/**
 * Generic function to fetch paginated data from an API.
 */
export async function fetchPaginatedData<T>(
  endpoint: string,
  params: Record<string, any> = {},
  returnFallback: boolean = false
): Promise<BaseResponse<T>> {
  try {
    const response = await api.get<BaseResponse<T>>(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching ${endpoint}:`, error);

    if (returnFallback) {
      return {
        success: false,
        items: [],
        total: 0,
        page: params.page || 1,
        totalPages: 0,
        message: "Failed to fetch data",
      } as BaseResponse<T>;
    }

    throw new Error("Failed to fetch data. Please try again.");
  }
}

/**
 * Default fallback response for non-paginated API calls.
 */
function defaultFallback<T>(): BaseResponse<T> {
  return {
    success: false,
    items: [],
    total: 0,
    page: 1,
    totalPages: 1,
    message: "Operation failed",
  };
}

/**
 * Generic function to create a new item.
 */
export async function createItem<T>(
  endpoint: string,
  data: T,
  returnFallback: boolean = false
): Promise<BaseResponse<T>> {
  try {
    const response = await api.post<BaseResponse<T>>(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`❌ Error creating item in ${endpoint}:`, error);

    if (returnFallback) {
      return defaultFallback<T>();
    }

    throw new Error("Failed to create item. Please try again.");
  }
}

/**
 * Generic function to update an existing item.
 */
export async function updateItem<T>(
  endpoint: string,
  id: string,
  data: T,
  returnFallback: boolean = false
): Promise<BaseResponse<T>> {
  try {
    const response = await api.put<BaseResponse<T>>(`${endpoint}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`❌ Error updating item in ${endpoint}:`, error);

    if (returnFallback) {
      return defaultFallback<T>();
    }

    throw new Error("Failed to update item. Please try again.");
  }
}

/**
 * Generic function to delete an item.
 */
export async function deleteItem(
  endpoint: string,
  id: string,
  returnFallback: boolean = false
): Promise<BaseResponse<void>> {
  try {
    await api.delete(`${endpoint}/${id}`);
    return {
      success: true,
      items: [],
      message: "Item deleted successfully",
      total: 0,
      page: 1,
      totalPages: 1,
    };
  } catch (error) {
    console.error(`❌ Error deleting item from ${endpoint}:`, error);

    if (returnFallback) {
      return defaultFallback<void>();
    }

    throw new Error("Failed to delete item. Please try again.");
  }
}
