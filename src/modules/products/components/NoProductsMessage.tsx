import { Package } from "lucide-react";
import ProductDialog from "@/modules/products/dialogs/ProductDialog";
import { NoDataMessage } from "@/components/app-ui/NoDataMessage";

const TITLE = "No Products Yet";
const DESCRIPTION =
  "You have not added any products to track. Start by adding your first product!";
const BTN_TEXT = "Add Your First Product";

/**
 * @component NoProductsMessage
 * @description Displays a message when no products are available.
 *
 * @returns {JSX.Element} The No Products UI.
 */
export function NoProductsMessage() {
  return (
    <NoDataMessage
      icon={<Package className="h-16 w-16 text-blue-600 mb-4" />}
      title={TITLE}
      description={DESCRIPTION}
      AddDialog={ProductDialog}
      buttonText={BTN_TEXT}
    />
  );
}
