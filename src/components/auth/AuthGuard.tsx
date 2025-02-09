"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FullScreenLoader from "../common/FullScreenLoading";
import { useAuth } from "@/hooks/useAuth";

/**
 * @component AuthGuard
 * @description Prevents unauthenticated users from accessing protected pages.
 *
 * @param {React.ReactNode} children - The page content that needs protection.
 * @returns {JSX.Element} - Either the protected content or redirects to `/sign-in`.
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  useAuth();
  const { data: session, status, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/dashboard/sign-in"); // Redirect to sign-in if user is not logged in
    }
  }, [status, router]);

  // ✅ Listen for session updates (e.g., when user logs out)
  useEffect(() => {
    const handleLogout = async () => {
      if (!session) {
        await update(); // Force session update
        router.push("/dashboard/sign-in");
      }
    };
    handleLogout();
  }, [session, router, update]);

  // Show loader while checking session state
  if (status === "loading") {
    return <FullScreenLoader />;
  }

  // ✅ If authenticated, render the protected page
  return <>{children}</>;
}
