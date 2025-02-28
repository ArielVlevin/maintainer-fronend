import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getSession, signOut } from "next-auth/react";

/**
 * The base API URL for all requests.
 * This URL is retrieved from the environment variable `NEXT_PUBLIC_API_URL`
 * and used as the base endpoint for API calls.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

/**
 * Axios instance configured with the base API URL and default headers.
 * This instance ensures all requests use JSON data format.
 *
 * @constant
 * @type {import("axios").AxiosInstance}
 * @property {string} baseURL - The base URL for API requests.
 * @property {Object} headers - Default headers for all API requests.
 * @property {string} headers.Content-Type - Specifies that all requests send JSON data.
 *
 * @example
 * api.get("/products") // Fetches products from the API.
 */
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Axios request interceptor that attaches the user's JWT token from NextAuth.
 * This ensures that all API requests are authenticated with a valid token.
 *
 * - Retrieves the user's session using `getSession()`.
 * - If a valid `accessToken` exists, it is attached to the request headers.
 * - If no token is found, the request proceeds without authentication.
 *
 * @returns {Promise<import("axios").AxiosRequestConfig>} - The updated request config.
 */
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.user?.accessToken)
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Axios response interceptor that handles authentication errors automatically.
 * This ensures that users are logged out when their JWT token expires or becomes invalid.
 *
 * - Listens for `401 Unauthorized` and `403 Forbidden` responses from the API.
 * - If a `401` (token expired) or `403` (invalid token) is detected, the user is logged out.
 * - Uses `signOut()` from `next-auth/react` to clear the session and redirect the user to `/sign-in`.
 *
 * @returns {Promise<import("axios").AxiosResponse | never>} - The original response or a rejected promise.
 *
 * @example
 * api.get("/protected-route") // If token is expired, user is logged out and redirected to sign-in.
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn("🚨 Authentication error: Logging out...");
      await signOut({ callbackUrl: "/sign-in" }); // ⬅️ מבצע התנתקות ושולח לדף ההתחברות
    }
    return Promise.reject(error);
  }
);

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  error?: string;
}

export const apiClient = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: any,
  config: AxiosRequestConfig = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await api({
      url: endpoint,
      method,
      data: body,
      ...config,
    });

    return response.data as ApiResponse<T>;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<null>>;

    if (axiosError.response)
      return {
        success: false,
        message: axiosError.response.data.message || "Unknown error",
        data: null, // 👈 החזר null עם טיפוס T
      };

    return {
      success: false,
      message: "Server unavailable. Please try again later.",
      data: null,
    };
  }
};
