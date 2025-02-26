"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TableRow } from "@/components/ui/table";
import { IProduct } from "@/types/IProduct";
import { formatDate } from "@/lib/utils";
import GenericList from "@/components/common/GenericList";
import { CardDropdownMenu } from "@/components/common/CardDropDownMenu";
import { renderTableCell } from "@/components/common/renderTableCell";

/**
 * @component ProductList
 * @description Displays a list of products using the generic list component.
 */
export default function ProductList({
  products,
  onEdit,
  onDelete,
}: {
  products: IProduct[];
  onEdit: (product: IProduct) => void;
  onDelete: (product: IProduct) => void;
}) {
  return (
    <GenericList
      title="Your Products"
      data={products}
      searchKeys={[
        "name",
        "category",
        "purchaseDate",
        "lastOverallMaintenance",
        "nextOverallMaintenance",
      ]}
      enableSearch={true}
      headers={[
        "Product Name",
        "Category",
        "Last Maintenance",
        "Next Maintenance",
        "View",
        "Actions",
      ]}
      renderRow={(product: IProduct) => (
        <TableRow key={product._id}>
          {renderProductNameCell(product)}
          {renderCategoryCell(product)}
          {renderLastMaintenanceCell(product)}
          {renderNextMaintenanceCell(product)}
          {renderViewDetailsCell(product)}
          {renderActionsCell(product, onEdit, onDelete)}
        </TableRow>
      )}
    />
  );
}

/**
 * @function renderProductNameCell
 * @description Renders the product name cell.
 */
const renderProductNameCell = (product: IProduct) =>
  renderTableCell(<span className="font-medium">{product.name}</span>);

/**
 * @function renderCategoryCell
 * @description Renders the product category cell.
 */
const renderCategoryCell = (product: IProduct) =>
  renderTableCell(product.category || "No Category");

/**
 * @function renderLastMaintenanceCell
 * @description Renders the last maintenance date cell.
 */
const renderLastMaintenanceCell = (product: IProduct) =>
  renderTableCell(formatDate(product.lastOverallMaintenance?.lastMaintenance));

/**
 * @function renderNextMaintenanceCell
 * @description Renders the next scheduled maintenance date cell.
 */
const renderNextMaintenanceCell = (product: IProduct) =>
  renderTableCell(formatDate(product.nextOverallMaintenance?.nextMaintenance));

/**
 * @function renderViewDetailsCell
 * @description Renders the "View Details" button inside a table cell.
 */
const renderViewDetailsCell = (product: IProduct) =>
  renderTableCell(
    <Link href={`/product/${product.slug}`}>
      <Button variant="outline" size="sm">
        View Details
      </Button>
    </Link>
  );

/**
 * @function renderActionsCell
 * @description Renders the actions menu inside a table cell.
 */
const renderActionsCell = (
  product: IProduct,
  onEdit: (product: IProduct) => void,
  onDelete: (product: IProduct) => void
) =>
  renderTableCell(
    <CardDropdownMenu
      onEdit={() => onEdit(product)}
      onDelete={() => onDelete(product)}
    />
  );
