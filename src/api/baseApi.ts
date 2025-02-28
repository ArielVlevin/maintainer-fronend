import { ApiResponse, BaseResponse } from "@/types/ApiResponse";
import { apiClient } from "./axios";

/**
 * פונקציה לשליפת נתונים מהשרת עם תמיכה בדפדוף
 */
export async function fetchPaginatedData<T>(
  endpoint: string,
  params: Record<string, any> = {}
): Promise<BaseResponse<T>> {
  try {
    const response = await apiClient<ApiResponse<T[]>>(endpoint, "GET", null, {
      params,
    });
    if (!response.success)
      throw new Error(response.message || "❌ Failed to fetch items.");

    return response.data as BaseResponse<T>;
  } catch (error) {
    console.error(
      `❌ Error fetching item in ${endpoint}:`,
      (error as Error)?.message || error
    );
    throw new Error((error as Error)?.message || "Failed to fetch items.");
  }
}

/**
 * פונקציה ליצירת פריט חדש
 */
export async function createItem<T>(endpoint: string, data: T): Promise<T> {
  try {
    const response = await apiClient<ApiResponse<T>>(endpoint, "POST", data);

    if (!response.success)
      throw new Error(response.message || "❌ Failed to create item.");

    return response.data as T;
  } catch (error) {
    console.error(
      `❌ Error creating item in ${endpoint}:`,
      (error as Error)?.message || error
    );
    throw new Error((error as Error)?.message || "Failed to create item.");
  }
}
export async function updateItem<T>(
  endpoint: string,
  id: string,
  data: T
): Promise<T> {
  try {
    const response = await apiClient<ApiResponse<T>>(
      `${endpoint}/${id}`,
      "PUT",
      data
    );

    if (!response.success) throw new Error(response.message);

    return response.data as T;
  } catch (error) {
    console.error(`❌ Error updating item in ${endpoint}:`, error);
    throw new Error((error as Error)?.message || "Failed to update item.");
  }
}

export async function deleteItem(endpoint: string, id: string): Promise<void> {
  try {
    const response = await apiClient<ApiResponse<void>>(
      `${endpoint}/${id}`,
      "DELETE"
    );

    if (!response.success)
      throw new Error(
        response.error || response.message || "❌ Failed to delete item."
      );
  } catch (error) {
    console.error(
      "❌ Error deleting item:",
      (error as Error)?.message || error
    );
    throw new Error((error as Error)?.message || "Failed to delete item.");
  }
}
