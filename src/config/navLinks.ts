const PROTECTED_ROUTES = [
  "/dashboard",
  "/product",
  "/settings",
  "/tasks",
  "/calendar",
];

export function isProtectedPage(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

export const navLinks = {
  dashboard: [
    { label: "Calendar", href: "/calendar" },
    { label: "Products", href: "/products" },
    { label: "Settings", href: "/dashboard/settings" },
  ],
  general: [
    { label: "Features", href: "#features" },
    { label: "Benefits", href: "#benefits" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ],
};
