import { IMaintenanceTask, IProduct } from "@/types";
import { delay } from "@/lib/utils";
import { api } from "@/api/axios";
import { uploadImage } from "@/api/upload";

/**
 * Fetches a single product by its ID, including associated tasks.
 *
 * @param {string} productId - The ID of the product to fetch.
 * @returns {Promise<IProduct>} The product data.
 * @throws {Error} If the request fails.
 */
export const fetchProductById = async (
  productId: string
): Promise<IProduct> => {
  try {
    const { data } = await api.get(`/products/${productId}`);
    return data;
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    throw new Error("Failed to fetch product. Please try again.");
  }
};

/**
 * Fetches a paginated list of products with optional search and filtering.
 *
 * @param {number} page - The page number to fetch.
 * @param {number} limit - The number of products per page.
 * @param {string} [search] - Optional search query for filtering products.
 * @param {string} [category] - Optional category filter.
 * @param {string[]} [fields] - Optional list of fields to include in the response.
 * @returns {Promise<{ products: IProduct[], total: number, totalPages: number }>} The paginated product data.
 * @throws {Error} If the request fails.
 */
export const fetchProducts = async (
  page: number,
  limit: number,
  search?: string,
  category?: string,
  fields?: string[]
) => {
  try {
    const query = new URLSearchParams();
    query.append("page", page.toString());
    query.append("limit", limit.toString());

    if (search) query.append("search", search);
    if (category && category !== "all") query.append("category", category);
    if (fields && fields.length > 0) {
      query.append("fields", fields.join(","));
    }

    await delay(1000); // Simulated delay

    const { data } = await api.get(`/products?${query.toString()}`);
    return data;
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    throw new Error("Failed to fetch products. Please try again.");
  }
};

/**
 * Fetches all tasks associated with a specific product.
 *
 * @param {string} productId - The ID of the product whose tasks should be fetched.
 * @returns {Promise<IMaintenanceTask[]>} An array of tasks.
 * @throws {Error} If the request fails.
 */
export const fetchProductTasks = async (
  productId: string
): Promise<IMaintenanceTask[]> => {
  try {
    const { data } = await api.get(`/products/${productId}/tasks`);
    return data;
  } catch (error) {
    console.error("❌ Error fetching product tasks:", error);
    throw new Error("Failed to fetch product tasks.");
  }
};

/**
 * Adds a new product to the database.
 *
 * @param {IProduct} product - The product details.
 * @param {File} [imageFile] - An optional image file to upload for the product.
 * @returns {Promise<IProduct>} The newly created product.
 * @throws {Error} If the request fails.
 */
export const addProduct = async (product: IProduct, imageFile?: File) => {
  try {
    let iconUrl;

    if (imageFile) {
      const uploadedImageUrl = await uploadImage(imageFile, "products");
      if (uploadedImageUrl) iconUrl = uploadedImageUrl;
    }

    const newProduct = { ...product, iconUrl };
    const { data } = await api.post("/products", newProduct);
    return data;
  } catch (error) {
    console.error("❌ Error adding product:", error);
    throw new Error("Failed to add product.");
  }
};

/**
 * Updates an existing product.
 *
 * @param {string} product_id - The ID of the product to update.
 * @param {IProduct} updatedProduct - The updated product details.
 * @param {File} [imageFile] - An optional image file to update for the product.
 * @returns {Promise<IProduct>} The updated product.
 * @throws {Error} If the request fails.
 */
export const updateProduct = async (
  product_id: string,
  updatedProduct: IProduct,
  imageFile?: File
) => {
  try {
    let iconUrl = updatedProduct.iconUrl;

    if (imageFile) {
      const uploadedImageUrl = await uploadImage(imageFile, "products");
      if (uploadedImageUrl) iconUrl = uploadedImageUrl;
    }

    const productData = { ...updatedProduct, iconUrl };
    const { data } = await api.put(`/products/${product_id}`, productData);
    return data;
  } catch (error) {
    console.error("❌ Error updating product:", error);
    throw new Error("Failed to update product.");
  }
};

/**
 * Deletes a product from the database.
 *
 * @param {string} productId - The ID of the product to delete.
 * @throws {Error} If the request fails.
 */
export const deleteProduct = async (productId: string) => {
  try {
    await api.delete(`/products/${productId}`);
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    throw new Error("Failed to delete product.");
  }
};

/**
 * Fetches a list of all product categories from the database.
 *
 * @returns {Promise<string[]>} An array of category names.
 * @throws {Error} If the request fails.
 */
export const fetchCategories = async (): Promise<string[]> => {
  try {
    const { data } = await api.get("/products/categories");
    return data;
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    throw new Error("Failed to fetch categories.");
  }
};
