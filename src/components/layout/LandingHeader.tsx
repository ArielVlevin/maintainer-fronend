"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenToolIcon as Tool } from "lucide-react";
import { useSession } from "next-auth/react";

/**
 * @component LandingHeader
 * @description The navigation bar for the landing page.
 *
 * @returns {JSX.Element} - The landing page header.
 */
export default function LandingHeader() {
  const { data: session } = useSession();

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-white bg-opacity-80 backdrop-blur-md dark:bg-gray-800 dark:bg-opacity-80 sticky top-0 z-10">
      <Link className="flex items-center justify-center" href="/">
        <Tool className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
        <span className="font-bold text-blue-600 dark:text-blue-400">
          MaintenancePro
        </span>
      </Link>
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
        {session ? (
          <Link href="/dashboard">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Dashboard
            </Button>
          </Link>
        ) : (
          <Link href="/dashboard/sign-in">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Sign In
            </Button>
          </Link>
        )}
      </nav>
    </header>
  );
}
