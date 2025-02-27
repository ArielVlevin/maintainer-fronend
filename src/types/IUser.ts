/**
 * @interface IUser
 * @description Defines the user structure in the application.
 */
export interface IUser {
  _id: string; // Unique identifier for the user
  name: string; // Full name of the user
  email: string; // Email address
  image?: string | null; // Profile picture URL (optional)
  emailVerified: boolean | null; // Indicates if the email is verified
  role: "user" | "admin"; // User role in the system
  products?: string[]; // List of product IDs associated with the user
  profileCompleted: boolean; // Indicates if the user has completed their profile
  createdAt: string; // Date when the user was created
}
