import { api } from "@/api/axios";
import { IUser } from "@/types/IUser";
import { getSession } from "next-auth/react";

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
  _id,
  name,
  email,
}: {
  _id: string;
  name: string;
  email: string;
}): Promise<IUser> => {
  try {
    const session = await getSession(); // ✅ קבלת ה-JWT המאומת מה-Session

    if (!session?.user?.accessToken) {
      throw new Error("No access token available. Please log in again.");
    }

    const response = await api.post(
      "/auth/verify-user", // ✅ וידוא שהתוואי תואם ל-Backend
      {
        _id,
        name,
        email,
      }
      //    {
      //      headers: {
      //        Authorization: `Bearer ${session.user.accessToken}`, // ✅ שליחת ה-JWT לאימות
      //       },
      //     }
    );

    return response.data.user;
  } catch (error) {
    console.error("❌ Error verifying user in backend:", error);
    throw new Error("Failed to verify user.");
  }
};

export const fetchUserById = async (_id: string): Promise<IUser | null> => {
  try {
    const response = await api.get<IUser>(`/auth/${_id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch user:", error);
    return null;
  }
};
