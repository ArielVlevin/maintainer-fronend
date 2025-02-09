import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

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
  },

  /**
   * Database adapter for managing authentication sessions.
   * Uses MongoDB to store user sessions.
   */
  adapter: MongoDBAdapter(clientPromise),

  /**
   * Authentication providers.
   * Currently supports Google but can be extended with other OAuth providers (e.g., Facebook, Apple).
   */
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
   * Callback functions for customizing authentication behavior.
   */
  callbacks: {
    /**
     * Handles JWT token generation.
     * - If the user logs in, generates a **custom JWT** containing user details.
     * - Stores `id`, `email`, and `role` inside the token.
     * - Token expires in 7 days.
     *
     * @param {JWT} token - The existing JWT token.
     * @param {any} user - The authenticated user object (available on first login).
     * @param {any} account - The account information (OAuth provider details).
     * @returns {JWT} - Updated token with the access token.
     */
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: any;
      account?: any;
    }) {
      if (user) {
        token.accessToken = jwt.sign(
          { id: user.id, email: user.email }, // Store user role and email
          JWT_SECRET,
          { expiresIn: "7d" }
        );
      }
      return token;
    },

    /**
     * Adds the JWT access token to the session object.
     * This token is used for authenticated API requests from the frontend.
     *
     * @param {Session} session - The user session object.
     * @param {JWT} token - The JWT token containing user data.
     * @returns {Session} - Updated session object with `accessToken`.
     */
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user._id = token.sub!;
        session.user.accessToken = token.accessToken; // Attach JWT to session
      }
      return session;
    },
  },

  /**
   * Secret key used for JWT encryption.
   * This should be set in environment variables for security.
   */
  secret: JWT_SECRET,
};

/**
 * The NextAuth handler for authentication routes.
 * Exposes authentication API endpoints (`/api/auth`).
 */
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
