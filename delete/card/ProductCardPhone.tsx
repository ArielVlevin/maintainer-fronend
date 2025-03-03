"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { List, Info } from "lucide-react";
import DetailsDialog from "@/components/dialog/DetailDialog";
import { ProductDetails } from "@/components/products/____ProductDetails";
import ProductDialog from "@/components/products/ProductDialog";
import AlertComponent from "@/components/dialog/AlertDialog";
import { IProduct } from "@/types/IProduct";
import { Center } from "../Center";
import { CardDropdownMenu } from "./CardDropDownMenu";

/**
 * @interface ProductCardProps
 * @description Interface for the props of `ProductCardPhone`.
 * @property {IProduct} product - The product details.
 * @property {(id: string) => void} onViewTasks - Function triggered when clicking the "View Tasks" button.
 * @property {(id: string) => void} onDelete - Function triggered when clicking the "Delete" button.
 */
interface ProductCardProps {
  product: IProduct;
  onViewTasks: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * @component ProductCardPhone
 * @description A mobile-friendly product card that displays product details, maintenance information,
 * and allows for actions like viewing tasks, editing, and deleting.
 *
 * @param {ProductCardProps} props - The properties of the component.
 * @returns {JSX.Element} React component for displaying a mobile product card.
 *
 * @example
 * <ProductCardPhone
 *   product={product}
 *   onViewTasks={(id) => console.log("View tasks for", id)}
 *   onDelete={(id) => console.log("Delete product", id)}
 * />
 */
export function ProductCardPhone({
  product,
  onViewTasks,
  onDelete,
}: ProductCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const imageUrl = product.iconUrl
    ? `${process.env.NEXT_PUBLIC_API_URL}${product.iconUrl}`
    : undefined;

  return (
    <>
      <Card className="w-[180px] h-[240px] min-w-[180px] min-h-[240px] max-w-[180px] max-h-[240px] flex flex-col shadow-md">
        <CardContent className="flex-grow p-2 relative flex flex-col items-center">
          {/* Dropdown Menu for Edit/Delete */}
          <div className="flex items-center justify-between w-full mb-8">
            <CardDropdownMenu
              onEdit={() => setIsDialogOpen(true)}
              onDelete={() => setIsAlertOpen(true)}
            />
          </div>

          {/* Product Information */}
          <div className="text-center">
            <Center>
              <Avatar className="h-10 w-10">
                <AvatarImage src={imageUrl} alt={product.name} />
                <AvatarFallback>{product.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Center>
            <h3 className="text-md font-bold truncate">{product.name}</h3>
            <p className="text-[10px] text-muted-foreground truncate">
              {product.category || "No Category"}
            </p>
          </div>

          {/* Maintenance Information */}
          <div className="grid gap-1 text-[10px] mt-2 w-full">
            <div className="bg-green-50 p-1 rounded-sm text-center">
              <p className="text-green-700 font-medium truncate">
                Last: {product.lastOverallMaintenance?.taskName || "No Data"}
              </p>
            </div>
            <div className="bg-red-50 p-1 rounded-sm text-center">
              <p className="text-red-700 font-medium truncate">
                Next: {product.nextOverallMaintenance?.taskName || "No Data"}
              </p>
            </div>
          </div>
        </CardContent>

        {/* Action Buttons */}
        <CardFooter className="p-2">
          <div className="grid grid-cols-2 gap-1 w-full">
            <Button
              size="sm"
              className="text-[10px] h-6 px-1"
              onClick={() => onViewTasks(product._id as string)}
            >
              <List className="h-3 w-3 mr-1" />
            </Button>
            <Button
              size="sm"
              className="text-[10px] h-6 px-1"
              onClick={() => setIsDetailsOpen(true)}
            >
              <Info className="h-3 w-3 mr-1" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Product Details Dialog */}
      <DetailsDialog
        title="📦 Product Details"
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      >
        <ProductDetails productId={product._id!} />
      </DetailsDialog>

      {/* Edit Product Dialog */}
      <ProductDialog
        productId={product._id}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />

      {/* Delete Confirmation Dialog */}
      <AlertComponent
        title="Are you sure you want to delete this product?"
        description={`"${product.name}" will be permanently removed.`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={() => {
          onDelete(product._id as string);
          setIsAlertOpen(false);
        }}
      />
    </>
  );
}
