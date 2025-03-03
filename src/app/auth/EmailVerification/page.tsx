"use client";

import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/modules/auth/AuthButton";
import FullScreenLoader from "@/components/common/FullScreenLoading";
import ChangeEmailDialog from "./ChangeEmailDialog";
import { useEmailVerification } from "@/hooks/useEmailVerification";

export default function EmailVerificationPage() {
  const {
    user,
    status,
    isDialogOpen,
    setDialogOpen,
    newEmail,
    setNewEmail,
    emailStatus,
    handleResendVerification,
    handleUpdateEmail,
  } = useEmailVerification();

  if (!user || user?.emailVerified) return <FullScreenLoader />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold text-red-600">🚨 Email Not Verified</h1>
      <p className="mt-2 text-gray-600">
        Your email <span className="font-bold">{user?.email}</span> has not been
        verified.
      </p>
      <p>Please check your inbox and verify your email to continue.</p>

      <div className="mt-4 flex gap-4">
        <Button
          onClick={handleResendVerification}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Resend Verification Email"}
        </Button>

        <ChangeEmailDialog
          isDialogOpen={isDialogOpen}
          setDialogOpen={setDialogOpen}
          newEmail={newEmail}
          setNewEmail={setNewEmail}
          handleUpdateEmail={handleUpdateEmail}
          emailStatus={emailStatus}
        />

        <LogoutButton />
      </div>
    </div>
  );
}
