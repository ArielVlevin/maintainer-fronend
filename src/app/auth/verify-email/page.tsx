"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyEmail } from "@/api/auth";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    verifyEmail(token)
      .then(() => {
        setStatus("success");
        setTimeout(() => router.push("/dashboard"), 3000);
      })
      .catch(() => setStatus("error"));
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {status === "loading" && <p>Verifying your email...</p>}
      {status === "success" && (
        <p className="text-green-600">✅ Email verified! Redirecting...</p>
      )}
      {status === "error" && (
        <div className="text-red-600">
          ❌ Invalid or expired verification link.
          <Button
            onClick={() => router.push("/auth/EmailVerification")}
            className="mt-4"
          >
            Resend Verification Email
          </Button>
        </div>
      )}
    </div>
  );
}
