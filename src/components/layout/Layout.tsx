"use client";

import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

/**
 * @component Layout
 * @description Wraps pages to provide a consistent background, header, and footer.
 *
 * @param {ReactNode} children - The page content.
 * @returns {JSX.Element} - The structured layout.
 */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
      <Header />
      <main className="min-h-screen flex items-center justify-center p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
