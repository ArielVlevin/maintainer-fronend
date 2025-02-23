import {
  DashBoardButton,
  LogoutButton,
  SignInButton,
} from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { usePathname } from "next/navigation";

export function HeaderAuth() {
  const pathname = usePathname();

  const { user, isLoading } = useAuth();

  if (isLoading)
    return (
      <Button className="bg-gray-600 hover:bg-gray-700 text-white">
        Loading...
      </Button>
    );
  if (user) {
    return (
      <>
        {pathname.startsWith("/dashboard") ||
        pathname.startsWith("/product") ? (
          <div className="flex items-center gap-3">
            <DashBoardButton />
            <LogoutButton />
          </div>
        ) : (
          <DashBoardButton />
        )}
      </>
    );
  } else if (!isLoading) return <SignInButton />;
}
