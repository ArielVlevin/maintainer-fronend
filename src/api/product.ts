import { IProduct } from "@/types/IProduct";
import { api, ApiResponse } from "./axios";
import { uploadImage } from "./upload";
import { deleteItem } from "./baseApi";

/**
 * Fetch a paginated list of products.
 *
 * @param {object} params - Query parameters for filtering products.
 * @returns {Promise<ApiResponse<IProduct[]>>} - List of products with pagination data.
 */
export const fetchProducts = async ({
  productId,
  slug,
  search,
  fields,
  category,
  page = 1,
  limit = 10,
  userOnly = true,
}: {
  productId?: string;
  slug?: string;
  search?: string;
  fields?: string[];
  category?: string;
  page?: number;
  limit?: number;
  userOnly?: boolean;
}): Promise<IProduct[]> => {
  try {
    const { data } = await api.get<ApiResponse<IProduct[]>>("/products", {
      params: {
        productId,
        slug,
        search,
        fields,
        category,
        page,
        limit,
        userOnly,
      },
    });

    if (!data.success)
      throw new Error(data.error || "❌ Failed to fetch products.");

    return data.data as IProduct[];
  } catch (error) {
    console.error(
      "❌ Error fetching products:",
      error?.response?.data || error
    );
    throw new Error(
      error?.response?.data?.message || "Failed to fetch products."
    );
  }
};

/**
 * Adds a new product to the database.
 *
 * @param {IProduct} product - The product details.
 * @param {File} [imageFile] - Optional image file to upload for the product.
 * @returns {Promise<IProduct>} The newly created product.
 * @throws {Error} If the request fails.
 */
export const addProduct = async (
  product: IProduct,
  imageFile?: File
): Promise<IProduct> => {
  try {
    let iconUrl = product.iconUrl;

    // ✅ Upload image if provided
    if (imageFile) {
      const uploadedImageUrl = await uploadImage(imageFile, "products");
      if (uploadedImageUrl) iconUrl = uploadedImageUrl;
    }

    const productData = { ...product, iconUrl };

    // ✅ Send product data to backend
    const { data } = await api.post<ApiResponse<IProduct>>(
      "/products",
      productData
    );

    if (!data.success)
      throw new Error(data.error || "❌ Failed to add product.");

    return data.data as IProduct;
  } catch (error: any) {
    console.error("❌ Error adding product:", error?.response?.data || error);
    throw new Error(error?.response?.data?.message || "Failed to add product.");
  }
};

/**
 * Updates an existing product in the database.
 *
 * @param {string} productId - The ID of the product to update.
 * @param {IProduct} updatedProduct - The updated product details.
 * @param {File} [imageFile] - Optional image file to update for the product.
 * @returns {Promise<IProduct>} The updated product.
 * @throws {Error} If the request fails.
 */
export const updateProduct = async (
  productId: string,
  updatedProduct: IProduct,
  imageFile?: File
): Promise<IProduct> => {
  try {
    let iconUrl = updatedProduct.iconUrl;

    // ✅ Upload image if a new file is provided
    if (imageFile) {
      const uploadedImageUrl = await uploadImage(imageFile, "products");
      if (uploadedImageUrl) iconUrl = uploadedImageUrl;
    }

    const productData = { ...updatedProduct, iconUrl };

    // ✅ Send updated product data to backend
    const { data } = await api.put<ApiResponse<IProduct>>(
      `/products/${productId}`,
      productData
    );

    if (!data.success)
      throw new Error(data.error || "❌ Failed to update product.");

    return data.data as IProduct;
  } catch (error: any) {
    console.error("❌ Error updating product:", error?.response?.data || error);
    throw new Error(
      error?.response?.data?.message || "Failed to update product."
    );
  }
};

/**
 * Delete a product.
 *
 * @param {string} productId - The ID of the product to delete.
 */
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await deleteItem("/products", productId);
    console.log("✅ Product deleted successfully.");
  } catch (error: any) {
    console.error("❌ Error deleting product:", error?.response?.data || error);
    throw new Error(
      error?.response?.data?.message || "Failed to delete product."
    );
  }
};
