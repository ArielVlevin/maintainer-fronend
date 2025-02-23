import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderNav() {
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
