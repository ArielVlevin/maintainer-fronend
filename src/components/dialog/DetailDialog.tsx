"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * @interface DetailsDialogProps
 * @description Props for the `DetailsDialog` component.
 * @property {string} title - The title of the dialog.
 * @property {boolean} open - Whether the dialog is open or not.
 * @property {() => void} onClose - Function to close the dialog.
 * @property {React.ReactNode} children - Content to display inside the dialog.
 */
interface DetailsDialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * @component DetailsDialog
 * @description A reusable dialog component for displaying detailed information.
 *
 * @param {DetailsDialogProps} props - The properties of the component.
 * @returns {JSX.Element | null} A dialog with a title and content.
 *
 * @example
 * // Example usage
 * <DetailsDialog
 *   title="Product Details"
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 * >
 *   <p>Product Name: Coffee Machine</p>
 *   <p>Category: Electronics</p>
 * </DetailsDialog>
 */
export default function DetailsDialog({
  title,
  open,
  onClose,
  children,
}: DetailsDialogProps) {
  // If dialog is not open, return null to prevent unnecessary rendering
  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">{children}</div>

        {/* Close Button */}
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
