"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * Component for updating user email
 */
export default function ChangeEmailDialog({
  isDialogOpen,
  setDialogOpen,
  newEmail,
  setNewEmail,
  handleUpdateEmail,
  emailStatus,
}: {
  isDialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  newEmail: string;
  setNewEmail: (email: string) => void;
  handleUpdateEmail: () => void;
  emailStatus: "idle" | "loading" | "success" | "error";
}) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
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
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter new email"
            className="w-full"
          />
          <Button
            onClick={handleUpdateEmail}
            disabled={emailStatus === "loading"}
          >
            {emailStatus === "loading" ? "Updating..." : "Update Email"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
