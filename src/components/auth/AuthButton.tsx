"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function AuthButton() {
  const { data: session } = useSession();

  return session ? (
    <div className="flex items-center gap-4">
      <p>Welcome, {session.user?.name}!</p>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  ) : (
    <Button onClick={() => signIn("google")}>Sign In with Google</Button>
  );
}

/**
 * Logout Button Component
 * Calls NextAuth `signOut()` function to log out the user
 */
export function LogoutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/" })} // Redirect to homepage after logout
      variant="destructive"
    >
      Logout
    </Button>
  );
}
