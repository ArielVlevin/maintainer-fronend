import {
  DashBoardButton,
  LogoutButton,
  SignInButton,
} from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";
import { isProtectedPage } from "@/config/navLinks";

export function HeaderAuth({
  pathname,
  isUser,
  isLoading,
}: {
  pathname: string;
  isUser: boolean;
  isLoading: boolean;
}) {
  if (isLoading)
    return (
      <Button disabled className="bg-gray-600 hover:bg-gray-700 text-white">
        Login
      </Button>
    );
  if (isUser) {
    return (
      <>
        {isProtectedPage(pathname) ? (
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
