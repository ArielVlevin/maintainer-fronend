"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import FullScreenLoader from "../app-ui/FullScreenLoading";

/**
 * @component AuthGuard
 * @description Protects pages by restricting access to authenticated users.
 * Redirects:
 *  - Unauthenticated users → `/dashboard/sign-in`
 *  - Users with incomplete profiles → `/dashboard/complete-profile`
 *
 * @param {React.ReactNode} children - The protected content.
 * @returns {JSX.Element} - Either the protected content or redirects.
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace("/sign-in");
      } else if (!user.profileCompleted) {
        router.replace("/dashboard/complete-profile");
      }
    }
    return;
  }, [user, isLoading, router]);

  if (isLoading) return <FullScreenLoader />;

  return <>{children}</>;
}
