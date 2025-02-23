import { BaseResponse } from "@/types/ApiResponse";
import { deleteItem } from "./baseApi";
import { IProduct } from "@/types/IProduct";
import { api } from "./axios";
import { uploadImage } from "./upload";
/**
 * Fetch a paginated list of products.
 *
 * @param {object} params - Query parameters for filtering products.
 * @returns {Promise<BaseResponse<IProduct>>} - List of products with pagination data.
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
}): Promise<BaseResponse<IProduct>> => {
  try {
    const response = await api.get<BaseResponse<IProduct>>("/products", {
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

    return response.data;
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    throw new Error("Failed to fetch products.");
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
    let iconUrl;

    // ✅ Upload image if provided
    if (imageFile) {
      const uploadedImageUrl = await uploadImage(imageFile, "products");
      if (uploadedImageUrl) iconUrl = uploadedImageUrl;
    }

    const newProduct = { ...product, iconUrl };

    // ✅ Send product data to backend
    const { data } = await api.post<IProduct>("/products", newProduct);
    return data;
  } catch (error) {
    console.error("❌ Error adding product:", error);
    throw new Error("Failed to add product.");
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
    const { data } = await api.put<IProduct>(
      `/products/${productId}`,
      productData
    );
    return data;
  } catch (error) {
    console.error("❌ Error updating product:", error);
    throw new Error("Failed to update product.");
  }
};
/**
 * Delete a product.
 *
 * @param {string} productId - The ID of the product to delete.
 */
export const deleteProduct = (productId: string) =>
  deleteItem("/products", productId);
