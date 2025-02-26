import { isProtectedPage, navLinks } from "@/config/navLinks";
import Link from "next/link";

export function HeaderNav({ pathname }: { pathname: string }) {
  const links = isProtectedPage(pathname)
    ? navLinks.dashboard
    : navLinks.general;

  return (
    <>
      {links.map(({ label, href }) => (
        <Link
          key={href}
          className="text-sm font-medium hover:text-blue-600"
          href={href}
        >
          {label}
        </Link>
      ))}
    </>
  );
}
