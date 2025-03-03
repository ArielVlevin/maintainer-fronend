import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import ProductDialog from "./ProductDialog";

/**
 * @component AddProductButton
 * @description A button that opens the `ProductDialog` to add a new product.
 *
 * @param {object} props - Component props.
 * @param {string} [props.className] - Optional additional classes for styling.
 *
 * @returns {JSX.Element} The Add Product button component.
 *
 * @example
 * <AddProductButton className="custom-class" />
 */
export function AddProductButton({
  className = "flex items-center",
}: {
  className?: string;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button className={cn(className)} onClick={() => setIsDialogOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        New Product
      </Button>
      {isDialogOpen && (
        <ProductDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </>
  );
}
