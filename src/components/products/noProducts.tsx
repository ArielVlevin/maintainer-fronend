import { useState } from "react";
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductDialog from "@/components/products/ProductDialog";

/**
 * @component NoProductsMessage
 * @description Displays a message when no products are available, encouraging users to add a new product.
 *
 * @returns {JSX.Element} The No Products UI.
 */
export function NoProductsMessage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Package className="h-16 w-16 text-blue-600 mb-4" />
      <h3 className="text-xl font-semibold mb-2">No Products Yet</h3>
      <p className="text-gray-600 mb-4">
        You have not added any products to track. Start by adding your first
        product!
      </p>
      <Button
        className="flex items-center"
        onClick={() => setIsDialogOpen(true)}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Your First Product
      </Button>

      {/* ✅ דיאלוג להוספת מוצר */}
      <ProductDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}
