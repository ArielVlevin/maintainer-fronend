import axios from "axios";
import { getSession } from "next-auth/react";

/**
 * The base API URL for all requests.
 * This URL is retrieved from the environment variable `NEXT_PUBLIC_API_URL`.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

/**
 * Axios instance configured with the base API URL and default headers.
 *
 * @constant
 * @type {import("axios").AxiosInstance}
 * @property {string} baseURL - The base URL for API requests.
 * @property {Object} headers - The default headers for all API requests.
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
 * Axios request interceptor that attaches the user's token from NextAuth.
 * If no token is found, the request proceeds without authorization.
 */
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.user?.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Axios response interceptor that logs errors and handles authentication failures.
 * If a request fails due to authentication, it will attempt to refresh the session.
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("🔄 Token expired, refreshing session...");
      await getSession(); // Refresh session
    }

    return Promise.reject(error);
  }
);
