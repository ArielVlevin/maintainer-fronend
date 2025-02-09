import { verifyUser } from "@/api/auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const useAuth = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      console.log("🔍 Verifying user in backend...");
      verifyUser({
        _id: session.user._id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        emailVerified: session.user.emailVerified || false,
      });
    }
  }, [session]);

  return session;
};
