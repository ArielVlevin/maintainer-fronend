import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      email?: string | null;
      accessToken?: unknown;
      name?: string | null;
      image?: string | null;
      emailVerified?: boolean | null;
      profileCompleted?: boolean | undefined;
      role?: "user" | "admin";
    };
  }
}
