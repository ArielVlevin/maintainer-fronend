import axios from "axios";
import { getSession } from "next-auth/react";

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
