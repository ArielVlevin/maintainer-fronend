"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FullScreenLoader from "../common/FullScreenLoading";

/**
 * @component AuthGuard
 * @description Prevents unauthenticated users from accessing protected pages.
 *
 * @param {React.ReactNode} children - The page content that needs protection.
 * @returns {JSX.Element} - Either the protected content or redirects to `/sign-in`.
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in"); // Redirect to sign-in if user is not logged in
    }
  }, [status, router]);

  // Show nothing while checking session state
  if (status === "loading") {
    return <FullScreenLoader />;
  }

  // ✅ If authenticated, render the protected page
  return <>{children}</>;
}
