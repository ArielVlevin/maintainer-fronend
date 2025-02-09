const API_URL =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001") + "/uploads";

export const DEFAULT_IMAGES = {
  avatar: `${API_URL}/default-avatar.png`,
  product: `${API_URL}/default-product.png`,
  background: `${API_URL}/default-background.jpg`,
  logo: `${API_URL}/default-logo.png`,
};
