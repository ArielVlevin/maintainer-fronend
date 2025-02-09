"use client";

import { usePathname } from "next/navigation";
import LandingHeader from "./LandingHeader";
import DashboardHeader from "./DashBoardHeader";

/**
 * @component Header
 * @description Determines which header to show based on the page.
 *
 * @returns {JSX.Element} - The appropriate header component.
 */
export default function Header() {
  const pathname = usePathname();

  // Show different headers based on the page
  if (pathname === "/") return <LandingHeader />;
  if (pathname.startsWith("/dashboard")) return <DashboardHeader />;

  return <LandingHeader />; // Default fallback
}
