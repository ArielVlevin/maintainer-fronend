import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { sendVerificationEmail, updateUser } from "@/api/auth";
import { useRouter } from "next/navigation";
import { delay } from "@/lib/utils";
import { useNotification } from "@/context/NotificationContext";

/**
 * Hook for handling email verification logic
 */
export function useEmailVerification() {
  const { showError, showSuccess } = useNotification();

  const { user, refreshUser } = useAuth();
  const router = useRouter();

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newEmail, setNewEmail] = useState<string>(user?.email || "");
  const [emailStatus, setEmailStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // Function to resend verification email
  const handleResendVerification = async () => {
    setStatus("loading");
    try {
      await sendVerificationEmail();
      showSuccess("Verification email sent successfully!");
      setStatus("success");
    } catch {
      showError("Failed to send verification email.");
      setStatus("error");
    }
  };

  // Function to update email
  const handleUpdateEmail = async () => {
    setEmailStatus("loading");
    try {
      await updateUser({ name: user?.name ?? "", email: newEmail });
      await refreshUser();
      await delay(2000);
      showSuccess("Email updated successfully!");
      setEmailStatus("success");
      setDialogOpen(false);
    } catch {
      showError("Failed to update email.");
      setEmailStatus("error");
    }
  };

  // Redirect if email is verified
  if (user?.emailVerified) {
    router.replace("/dashboard");
  }

  return {
    user,
    status,
    isDialogOpen,
    setDialogOpen,
    newEmail,
    setNewEmail,
    emailStatus,
    handleResendVerification,
    handleUpdateEmail,
  };
}
