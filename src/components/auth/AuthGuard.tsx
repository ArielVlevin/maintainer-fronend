"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FullScreenLoader from "../common/FullScreenLoading";
import { useAuth } from "@/context/authContext";

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
        router.replace("/sign-in"); // 🔴 הפניה רק אחרי שהטעינה הסתיימה
      } else if (!user.profileCompleted) {
        router.replace("/dashboard/complete-profile"); // 🔄 הפניה אם הפרופיל לא שלם
      }
    }
    return;
  }, [user, isLoading, router]);
  if (isLoading) return <FullScreenLoader />;

  return <>{children}</>;
}
