import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
//import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
//import clientPromise from "@/lib/mongodb";
import { verifyUser } from "@/api/auth";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

/**
 * @fileoverview NextAuth.js configuration for authentication management.
 *
 * - Supports OAuth providers (Google, with the ability to extend for Facebook/Apple).
 * - Generates a custom JWT for internal backend authentication.
 * - Uses a MongoDB adapter to store user sessions.
 * - Implements token-based authentication strategy.
 */

/**
 * Authentication options for NextAuth.js.
 * Configures authentication providers, JWT token handling, and session management.
 *
 * @constant
 * @type {NextAuthOptions}
 */
export const authOptions: NextAuthOptions = {
  /**
   * Custom authentication pages configuration.
   * Defines a custom sign-in page route.
   */
  pages: {
    signIn: "/sign-in",
    newUser: "/dashboard/complete-profile",
  },

  /**
   * Database adapter for managing authentication sessions.
   * Uses MongoDB to store user sessions.
   */
  //adapter: MongoDBAdapter(clientPromise),

  /**
   * Authentication providers.
   * Currently supports Google but can be extended with other OAuth providers (e.g., Facebook, Apple).
   */
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    // Additional providers such as Facebook and Apple can be added here.
  ],

  /**
   * Configures session strategy.
   * Uses JSON Web Tokens (JWT) for session management instead of database sessions.
   */
  session: {
    strategy: "jwt",
  },
  /**
   * Secret key used for JWT encryption.
   * This should be set in environment variables for security.
   */
  secret: process.env.NEXTAUTH_SECRET,

  /**
   * Callback functions for customizing authentication behavior.
   */
  callbacks: {
    /**
     * Handles JWT token creation and user verification with backend.
     *
     * @param {JWT} token - The existing JWT token.
     * @param {any} user - The authenticated user object (available on first login).
     * @param {any} account - The account information (OAuth provider details).
     * @returns {JWT} - Updated token with user details from backend.
     */
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        // First login, send the user's email to backend for verification
        try {
          if (!user.email)
            throw new Error("❌ User email is missing from OAuth provider.");

          const response = await verifyUser({
            email: user.email,
            name: user.name || "",
          });
          // Save user details in the token
          token._id = response._id;
          token.name = response.name;
          token.email = response.email;
          token.accessToken = jwt.sign(
            { _id: response._id, email: response.email },
            JWT_SECRET,
            { expiresIn: "7d" }
          );
        } catch (error) {
          console.error("❌ Error verifying user with backend:", error);
          throw new Error("Failed to verify user.");
        }
      }
      return token;
    },

    /**
     * Adds the JWT access token to the session object.
     *
     * @param {Session} session - The user session object.
     * @param {JWT} token - The JWT token containing user data.
     * @returns {Session} - Updated session object with accessToken.
     */
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user._id = String(token._id);
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

/**
 * The NextAuth handler for authentication routes.
 * Exposes authentication API endpoints (/api/auth).
 */
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
