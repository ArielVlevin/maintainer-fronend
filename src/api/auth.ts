import { api, ApiResponse } from "@/api/axios";
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
    // שליחת הבקשה עם טיפוס נתונים מדויק
    const { data } = await api.post<ApiResponse<IUser>>("/auth/verify-user", {
      name,
      email,
    });

    console.log("✅ Backend response:", data);

    // בדיקה אם הבקשה נכשלה
    if (!data.success || !data.data) {
      throw new Error(data.error || "❌ Invalid response from backend.");
    }

    return data.data;
  } catch (error: any) {
    console.error(
      "❌ Error verifying user in backend:",
      error?.response?.data || error
    );
    throw new Error(error?.response?.data?.message || "Failed to verify user.");
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
    const { data } = await api.post<ApiResponse<null>>("/auth/update-user", {
      name,
      email,
    });

    if (!data.success)
      throw new Error(data.error || "❌ Failed to update user.");

    console.log("✅ User profile updated successfully");
  } catch (error: any) {
    console.error(
      "❌ Error updating user profile:",
      error?.response?.data || error
    );
    throw new Error(error?.response?.data?.message || "Failed to update user.");
  }
};

/**
 * Fetches a user by their ID from the backend.
 *
 * @param {string} _id - The user's ID.
 * @returns {Promise<IUser | null>} - The user object or null if not found.
 * @throws {Error} If the request fails.
 */
export const fetchUserById = async (_id: string): Promise<IUser | null> => {
  try {
    const { data } = await api.get<ApiResponse<IUser>>(`/auth/${_id}`);

    if (!data.success)
      throw new Error(data.error || "❌ Failed to fetch user.");

    return data.data;
  } catch (error: any) {
    console.error("❌ Failed to fetch user:", error?.response?.data || error);
    throw new Error(error?.response?.data?.message || "Failed to fetch user.");
  }
};

/**
 * Sends a verification email to the user.
 *
 * @returns {Promise<void>} - Resolves when the email is sent.
 * @throws {Error} If the request fails.
 */
export async function sendVerificationEmail(): Promise<void> {
  try {
    const { data } = await api.post<ApiResponse<null>>(
      "/auth/send-verification-email"
    );

    if (!data.success)
      throw new Error(data.error || "❌ Failed to send verification email.");
  } catch (error: any) {
    console.error(
      "❌ Failed to send verification Email:",
      error?.response?.data || error
    );
    throw new Error(
      error?.response?.data?.message || "Failed to send verification email."
    );
  }
}

/**
 * Verifies a user's email using a token.
 *
 * @param {string} token - The verification token.
 * @returns {Promise<{ success: boolean, message: string }>} - Verification result.
 * @throws {Error} If the request fails.
 */
export async function verifyEmail(
  token: string
): Promise<{ success: boolean; message: string }> {
  try {
    const { data } = await api.post<ApiResponse<null>>("/auth/verify-email", {
      token,
    });

    if (!data.success) {
      console.warn("⚠️ Verification failed:", data.error);
      return { success: false, message: data.error || "Verification failed." };
    }
    return { success: true, message: "Email verified successfully." };
  } catch (error) {
    console.error("❌ Failed to verify email:", error?.response?.data || error);
    throw new Error(
      error?.response?.data?.message || "Failed to verify email."
    );
  }
}
