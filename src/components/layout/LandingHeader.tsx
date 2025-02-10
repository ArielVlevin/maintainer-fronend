"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenToolIcon as Tool, LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useAuth } from "@/context/authContext";

/**
 * @component LandingHeader
 * @description The navigation bar for the landing page.
 *
 * @returns {JSX.Element} - The landing page header.
 */
export default function LandingHeader() {
  const { user, isLoading } = useAuth();

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-white bg-opacity-80 backdrop-blur-md dark:bg-gray-800 dark:bg-opacity-80 sticky top-0 z-10 shadow">
      {/* 🔹 לוגו */}
      <Link
        className="flex items-center justify-center"
        href="/"
        aria-label="Go to homepage"
      >
        <Tool className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
        <span className="font-bold text-blue-600 dark:text-blue-400">
          MaintenancePro
        </span>
      </Link>

      {/* 🔹 ניווט */}
      <nav className="flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:text-blue-600"
          href="#features"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium hover:text-blue-600"
          href="#benefits"
        >
          Benefits
        </Link>
        <Link
          className="text-sm font-medium hover:text-blue-600"
          href="#pricing"
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium hover:text-blue-600"
          href="#contact"
        >
          Contact
        </Link>

        {/* 🔹 אם המשתמש נטען */}
        {isLoading ? (
          <span className="text-sm font-medium text-gray-500">Loading...</span>
        ) : user ? (
          // 🔹 משתמש מחובר
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Dashboard
              </Button>
            </Link>
            <Button
              onClick={() => signOut()}
              className="bg-red-600 hover:bg-red-700 text-white flex items-center"
            >
              <LogOutIcon className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        ) : (
          // 🔹 משתמש לא מחובר, אבל טוען הסתיים
          !isLoading && (
            <Link href="/sign-in">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Sign In
              </Button>
            </Link>
          )
        )}
      </nav>
    </header>
  );
}
