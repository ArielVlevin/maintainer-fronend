import { api } from "@/api/axios";
import { getSession } from "next-auth/react";

/**
 * Verifies if the user exists in the backend. If not, it creates a new user.
 *
 * @param {Object} user - The user object from NextAuth session.
 * @param {string} user._id - The unique ID of the user.
 * @param {string} [user.name] - The name of the user.
 * @param {string} [user.email] - The email address of the user.
 * @param {string} [user.image] - The profile image URL of the user.
 * @returns {Promise<void>} Resolves when the user verification is complete.
 * @throws {Error} If the request fails.
 */
export const verifyUser = async ({
  _id,
  name,
  email,
  image,
  emailVerified,
}: {
  _id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  emailVerified?: boolean | null;
}): Promise<void> => {
  try {
    const session = await getSession(); // ✅ קבלת ה-JWT המאומת מה-Session

    console.log("dfsfsd");
    if (!session?.user?.accessToken) {
      throw new Error("No access token available. Please log in again.");
    }

    console.log("session: ", session);
    await api.post(
      "/auth/verify-user", // ✅ וידוא שהתוואי תואם ל-Backend
      {
        _id,
        name,
        email,
        image,
        emailVerified,
      },
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`, // ✅ שליחת ה-JWT לאימות
        },
      }
    );

    console.log("✅ User verified successfully in backend.");
  } catch (error) {
    console.error("❌ Error verifying user in backend:", error);
    throw new Error("Failed to verify user.");
  }
};
