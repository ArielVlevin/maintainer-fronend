import Link from "next/link";
import { PenToolIcon as Tool } from "lucide-react";
import { isProtectedPage } from "@/config/navLinks";

export function HeaderLogo({ pathname }: { pathname: string }) {
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
      {isProtectedPage(pathname) ? (
        <Link
          className="flex items-center justify-center"
          href="/dashboard"
          aria-label="Go to homepage"
        >
          | Dashboard
        </Link>
      ) : null}
    </span>
  );
}
