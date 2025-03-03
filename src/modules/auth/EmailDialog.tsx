"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEmailVerification } from "@/hooks/useEmailVerification";

export default function ChangeEmailDialog({
  currentEmail,
}: {
  currentEmail: string;
}) {
  const { email, setEmail, loading, status, handleEmailChange } =
    useEmailVerification(currentEmail);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Change Email</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Your Email</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter new email"
            className="w-full"
          />
          <Button onClick={handleEmailChange} disabled={loading}>
            {loading ? "Updating..." : "Update Email"}
          </Button>
          {status === "success" && (
            <p className="text-green-600">✅ Verification email sent!</p>
          )}
          {status === "error" && (
            <p className="text-red-600">❌ Failed to update email.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
