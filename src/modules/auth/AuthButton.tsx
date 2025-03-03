"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Apple, Facebook, LogOutIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function AuthButtons() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (provider: string) => {
    setIsLoading(true);
    await signIn(provider, { callbackUrl: "/dashboard" });
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <Button
        className="w-full flex items-center justify-center gap-2"
        variant="outline"
        onClick={() => handleSignIn("google")}
        disabled={isLoading}
      >
        <FcGoogle className="w-5 h-5" />
        Sign in with Google
      </Button>
      <Button
        className="w-full flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800"
        onClick={() => handleSignIn("apple")}
        disabled={isLoading}
      >
        <Apple className="w-5 h-5" />
        Sign in with Apple
      </Button>
      <Button
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
        onClick={() => handleSignIn("facebook")}
        disabled={isLoading}
      >
        <Facebook className="w-5 h-5" />
        Sign in with Facebook
      </Button>
    </div>
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
      className="bg-red-600 hover:bg-red-700 text-white flex items-center"
    >
      <LogOutIcon className="w-4 h-4 mr-1" /> Logout
    </Button>
  );
}

export function SignInButton() {
  return (
    <Link href="/sign-in">
      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
        Sign In
      </Button>
    </Link>
  );
}

export function DashBoardButton() {
  return (
    <Link href="/dashboard">
      <Button className="bg-green-600 hover:bg-green-700 text-white">
        Dashboard
      </Button>
    </Link>
  );
}
