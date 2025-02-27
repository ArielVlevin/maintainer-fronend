import { api } from "@/api/axios";
import { IUser } from "@/types/IUser";

/**
 * Verifies if the user exists in the backend. If not, it creates a new user.
 *
 * @param {Object} user - The user object from NextAuth session.
 * @param {string} user._id - The unique ID of the user.
 * @param {string} [user.name] - The name of the user.
 * @param {string} [user.email] - The email address of the user.
 * @returns {Promise<void>} Resolves when the user verification is complete.
 * @throws {Error} If the request fails.
 */
export const verifyUser = async ({
  email,
  name,
}: {
  email: string;
  name: string;
}): Promise<IUser> => {
  if (!name || !email) throw new Error("❌ User data is missing.");

  try {
    const response = await api.post("/auth/verify-user", {
      name,
      email,
    });

    console.log("✅ Backend response:", response.data);

    if (!response.data || !response.data.user)
      throw new Error("❌ Invalid response from backend.");

    return response.data.user;
  } catch (error) {
    console.error("❌ Error verifying user in backend: ", error);
    throw new Error("Failed to verify user.");
  }
};

/**
 * Updates user information (name & email) in the backend.
 *
 * @param {Object} userData - User information to update.
 * @param {string} userData.name - The new name of the user.
 * @param {string} userData.email - The new email of the user.
 * @returns {Promise<void>} - Resolves when the user update is complete.
 * @throws {Error} If the request fails.
 */
export const updateUser = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}): Promise<void> => {
  try {
    const response = await api.post("/auth/update-user", {
      name,
      email,
    });

    if (!response.data.success)
      throw new Error(response.data.message || "Failed to update user");

    console.log("✅ User profile updated successfully");
  } catch (error) {
    console.error("❌ Error updating user profile:", error);
    throw new Error("Failed to update user.");
  }
};

export const fetchUserById = async (_id: string): Promise<IUser | null> => {
  try {
    const response = await api.get<IUser>(`/auth/${_id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
};

export async function sendVerificationEmail() {
  try {
    const response = await api.post("/auth/send-verification-email");
    return response.data;
  } catch (error) {
    console.error("❌ Failed to send verification Email:", error);
    throw new Error("Failed to send verification Email.");
  }
}

export async function verifyEmail(token: string) {
  try {
    const response = await api.post("/auth/verify-email", { token });
    if (!response.data.success) {
      console.log("⚠️ Verification failed:", response.data.message);
      return { success: false, message: response.data.message };
    }
    return response.data;
  } catch (error) {
    console.error("❌ Failed to verify Email:", error);
    throw new Error("Failed to verify Email.");
  }
}
