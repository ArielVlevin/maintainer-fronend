"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/**
 * @interface FormDialogProps
 * @description Props for the `FormDialog` component.
 * @property {string} title - The title of the dialog.
 * @property {boolean} open - Controls whether the dialog is open or closed.
 * @property {() => void} onClose - Callback function triggered when closing the dialog.
 * @property {() => void} onConfirm - Callback function triggered when confirming the action.
 * @property {string} [confirmText="Send"] - Custom text for the confirm button (default: "Send").
 * @property {string} [cancelText="Cancel"] - Custom text for the cancel button (default: "Cancel").
 * @property {React.ReactNode} children - The form or content to be displayed inside the dialog.
 */
interface FormDialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  children: React.ReactNode;
}

/**
 * @component FormDialog
 * @description A reusable dialog component designed for form submissions.
 * It includes a title, a content area for forms, and configurable confirm/cancel buttons.
 *
 * @param {FormDialogProps} props - The properties of the component.
 * @returns {JSX.Element} The rendered dialog component.
 *
 * @example
 * // Example usage
 * <FormDialog
 *   title="Submit Feedback"
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onConfirm={handleSubmit}
 *   confirmText="Submit"
 *   cancelText="Cancel"
 * >
 *   <input type="text" placeholder="Your feedback" />
 * </FormDialog>
 */
export default function FormDialog({
  title,
  open,
  onClose,
  onConfirm,
  confirmText = "Send",
  cancelText = "Cancel",
  children,
}: FormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {/* Form content */}
        <div className="py-4">{children}</div>

        {/* Footer with cancel and confirm buttons */}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{cancelText}</Button>
          </DialogClose>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
