"use client";

import { HeaderAuth } from "./header/HeaderAuth";
import { HeaderLogo } from "./header/HeaderLogo";
import { HeaderNav } from "./header/HeaderNac";

/**
 * @component Header
 * @description Determines which header to show based on the page.
 *
 * @returns {JSX.Element} - The appropriate header component.
 */
export default function Header() {
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
