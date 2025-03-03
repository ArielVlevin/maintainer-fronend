"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleAlertIcon } from "lucide-react";

interface ConfirmDeleteDialogProps {
  title: string;
  description: string;
  confirmText: string;
  onConfirm: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ConfirmDeleteDialog({
  title,
  description,
  confirmText,
  onConfirm,
  open,
  onOpenChange,
}: ConfirmDeleteDialogProps) {
  const [inputValue, setInputValue] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <CircleAlertIcon className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">{title}</DialogTitle>
            <DialogDescription className="sm:text-center">
              {description}{" "}
              <span className="text-foreground">{confirmText}</span>.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="*:not-first:mt-2">
            <Label htmlFor="confirm">Confirm Name</Label>
            <Input
              id="confirm"
              type="text"
              placeholder={`Type "${confirmText}" to confirm`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              className="flex-1"
              disabled={inputValue !== confirmText}
              onClick={onConfirm}
            >
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
