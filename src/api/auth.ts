import { api } from "@/api/axios";

/**
 * Verifies if the user exists in the backend. If not, it creates a new user.
 *
 * @param {Object} user - The user object from NextAuth session.
 * @param {string} user.id - The unique ID of the user.
 * @param {string} user.name - The name of the user.
 * @param {string} user.email - The email address of the user.
 * @param {string} user.image - The profile image URL of the user.
 * @returns {Promise<void>} Resolves when the user verification is complete.
 * @throws {Error} If the request fails.
 */
export const verifyUser = async ({
  _id,
  name,
  email,
  image,
}: {
  _id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}): Promise<void> => {
  try {
    await api.post("/auth/verify-user", {
      _id,
      name,
      email,
      image,
    });
    console.log("✅ User verified successfully in backend.");
  } catch (error) {
    console.error("❌ Error verifying user in backend:", error);
    throw new Error("Failed to verify user.");
  }
};
