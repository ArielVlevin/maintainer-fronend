"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenToolIcon as Tool } from "lucide-react";
import { signOut } from "next-auth/react";

/**
 * @component DashboardHeader
 * @description The navigation bar for authenticated users on the dashboard.
 *
 * @returns {JSX.Element} - The dashboard header.
 */
export default function DashboardHeader() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-white bg-opacity-80 backdrop-blur-md dark:bg-gray-800 dark:bg-opacity-80 sticky top-0 z-10">
      <Link className="flex items-center justify-center" href="/dashboard">
        <Tool className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
        <span className="font-bold text-blue-600 dark:text-blue-400">
          MaintenancePro Dashboard
        </span>
      </Link>
      <nav className="flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:text-blue-600"
          href="/dashboard/products"
        >
          Products
        </Link>
        <Link
          className="text-sm font-medium hover:text-blue-600"
          href="/dashboard/settings"
        >
          Settings
        </Link>
        <Button
          onClick={() => signOut()}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Sign Out
        </Button>
      </nav>
    </header>
  );
}
