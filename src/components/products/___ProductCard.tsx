"use client";

import { Eye, List } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IProduct } from "@/types";
import AlertComponent from "../common/AlertDialog";
import Image from "next/image";
import { DEFAULT_IMAGES } from "@/config/defaultImages";
import { Separator } from "../ui/separator";
import { useState } from "react";
import ProductDialog from "./ProductDialog";
import { CardDropdownMenu } from "../app-ui/card/CardDropDownMenu";
import DetailsDialog from "../common/DetailDialog";
import { ProductDetails } from "./____ProductDetails";

interface ProductCardProps {
  product: IProduct;
  onViewTasks: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ProductCard({
  product,
  onViewTasks,
  onDelete,
}: ProductCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const imageUrl = product.iconUrl
    ? `${process.env.NEXT_PUBLIC_API_URL}${product.iconUrl}`
    : DEFAULT_IMAGES.product;

  return (
    <>
      <Card className="w-full max-w-[450px]  mx-auto shadow-md rounded-lg bg-gray-100">
        <CardHeader>
          <div className="flex justify-between items-start ">
            <div className="flex justify-between items-start gap-2">
              <div className="flex flex-col items-center ">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="rounded-md object-cover"
                    priority // Loads image faster for better LCP
                  />
                </div>
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-800 mt-1">
                  {product.name}
                </CardTitle>
                <p className="text-sm text-gray-600">
                  {product.category || "No Category"}
                </p>
              </div>
            </div>
            <CardDropdownMenu
              onEdit={() => setIsDialogOpen(true)}
              onDelete={() => setIsAlertOpen(true)}
            />
          </div>
          <Separator className="bg-gray-300 " />
        </CardHeader>

        <CardContent className="space-y-2">
          {/* Maintenance Dates */}
          <div className="mb-4 flex gap-2 ">
            <div className="h-[100px] w-[200px]  bg-green-200 rounded-lg text-center">
              <p className="text-sm">
                <span className="font-semibold">🛠️ Last Maintenance:</span>{" "}
                {product.lastOverallMaintenance
                  ? `${product.lastOverallMaintenance.taskName} - ${new Date(
                      product.lastOverallMaintenance.lastMaintenance
                    ).toLocaleDateString()}`
                  : "No Maintenance Data"}
              </p>
            </div>
            <div className="h-[100px] w-[200px] bg-red-500 rounded-lg text-center">
              <p className="text-sm">
                <span className="font-semibold">⏳ Next Maintenance:</span>{" "}
                {product.nextOverallMaintenance
                  ? `${product.nextOverallMaintenance.taskName} - ${new Date(
                      product.nextOverallMaintenance.nextMaintenance
                    ).toLocaleDateString()}`
                  : "No Upcoming Maintenance"}
              </p>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewTasks(product._id as string)}
            >
              <List className="h-4 w-4 mr-2" />
              View Tasks
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDetailsOpen(true)}
            >
              <Eye className="h-4 w-4 mr-2" />
              More Details
            </Button>
          </div>
        </CardContent>
      </Card>

      <DetailsDialog
        title="📦 Product Details"
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      >
        <ProductDetails productId={product._id!} />
      </DetailsDialog>

      <ProductDialog
        productId={product._id}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <AlertComponent
        title="Are you sure you want to delete this product?"
        description={`"${product.name}" will be permanently removed.`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)} //  Close the alert dialog
        onConfirm={() => {
          onDelete(product._id as string);
          setIsAlertOpen(false); //  Close after deletion
        }}
      />
    </>
  );
}

/*
     
        <div className="flex flex-wrap gap-2">
          {product.tags?.length ? (
            product.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-xs">No Tags</span>
          )}
        </div>
*/
