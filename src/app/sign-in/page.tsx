"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Apple, Facebook } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  const handleSignIn = async (provider: string) => {
    setIsLoading(true);
    try {
      await signIn(provider, { callbackUrl: "/dashboard" }); // Redirect after sign-in
    } catch (error) {
      console.error("Sign-in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Choose your preferred sign-in method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Sign-In */}
            <Button
              className="w-full flex items-center justify-center gap-2"
              variant="outline"
              onClick={() => handleSignIn("google")}
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full"
                />
              ) : (
                <>
                  <FcGoogle className="w-5 h-5" />
                  Sign in with Google
                </>
              )}
            </Button>

            {/* Apple Sign-In */}
            <Button
              className="w-full flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800"
              onClick={() => handleSignIn("apple")}
              disabled={isLoading}
            >
              <Apple className="w-5 h-5" />
              Sign in with Apple
            </Button>

            {/* Facebook Sign-In */}
            <Button
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
              onClick={() => handleSignIn("facebook")}
              disabled={isLoading}
            >
              <Facebook className="w-5 h-5" />
              Sign in with Facebook
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
