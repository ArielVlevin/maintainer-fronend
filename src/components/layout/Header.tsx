"use client";

import { usePathname } from "next/navigation";

import { PenToolIcon as Tool, LogOutIcon } from "lucide-react";

import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

/**
 * @component Header
 * @description Determines which header to show based on the page.
 *
 * @returns {JSX.Element} - The appropriate header component.
 */
export default function Header() {
  // Show different headers based on the page
  // if (pathname === "/") return <LandingHeader />;
  // if (pathname.startsWith("/dashboard")) return <DashboardHeader />;

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-white bg-opacity-80 backdrop-blur-md dark:bg-gray-800 dark:bg-opacity-80 sticky top-0 z-10 shadow">
      <HeaderLogo />
      <nav className="flex items-center gap-4 sm:gap-6">
        <HeaderNav />
        <HeaderAuth />
      </nav>
    </header>
  );
}

function HeaderAuth() {
  const pathname = usePathname();

  const { user, isLoading } = useAuth();

  if (isLoading)
    return (
      <span className="text-sm font-medium text-gray-500">Loading...</span>
    );
  if (user) {
    return (
      <>
        {pathname.startsWith("/dashboard") ? (
          <Button
            onClick={() => signOut()}
            className="bg-red-600 hover:bg-red-700 text-white flex items-center"
          >
            <LogOutIcon className="w-4 h-4 mr-1" /> Logout
          </Button>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Dashboard
              </Button>
            </Link>
          </div>
        )}
      </>
    );
  } else if (!isLoading)
    return (
      <Link href="/sign-in">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Sign In
        </Button>
      </Link>
    );
}

function HeaderLogo() {
  const pathname = usePathname();

  return (
    <span className="font-bold text-blue-600 dark:text-blue-400 flex gap-2">
      <Link
        className="flex items-center justify-center"
        href="/"
        aria-label="Go to homepage"
      >
        <Tool className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />

        <>MaintenancePro</>
      </Link>
      {pathname.startsWith("/dashboard") && (
        <Link
          className="flex items-center justify-center"
          href="/dashboard"
          aria-label="Go to homepage"
        >
          | Dashboard
        </Link>
      )}
    </span>
  );
}

function HeaderNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/product"))
    return (
      <>
        <Link
          className="text-sm font-medium hover:text-blue-600"
          href="/products"
        >
          Products
        </Link>
        <Link
          className="text-sm font-medium hover:text-blue-600"
          href="/dashboard/settings"
        >
          Settings
        </Link>
      </>
    );

  return (
    <>
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
      <Link className="text-sm font-medium hover:text-blue-600" href="#pricing">
        Pricing
      </Link>
      <Link className="text-sm font-medium hover:text-blue-600" href="#contact">
        Contact
      </Link>
    </>
  );
}
