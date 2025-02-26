"use client";

import { HeaderAuth } from "./header/HeaderAuth";
import { HeaderLogo } from "./header/HeaderLogo";
import { HeaderNav } from "./header/HeaderNav";

/**
 * @component Header
 * @description Determines which header to show based on the page.
 *
 * @returns {JSX.Element} - The appropriate header component.
 */
export default function Header({
  pathname,
  isLoading,
  isUser,
}: {
  pathname: string;
  isLoading: boolean;
  isUser: boolean;
}) {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-white bg-opacity-80 backdrop-blur-md dark:bg-gray-800 dark:bg-opacity-80 sticky top-0 z-10 shadow">
      <HeaderLogo pathname={pathname} />
      <nav className="flex items-center gap-4 sm:gap-6">
        <HeaderNav pathname={pathname} />
        <HeaderAuth pathname={pathname} isUser={isUser} isLoading={isLoading} />
      </nav>
    </header>
  );
}
