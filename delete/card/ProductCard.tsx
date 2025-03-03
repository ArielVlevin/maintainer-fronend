"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CardDropdownMenu } from "@/components/app-ui/card/CardDropDownMenu";
import { Eye, List } from "lucide-react";
import { IProduct } from "@/types";
import DetailsDialog from "@/components/dialog/DetailDialog";
import { ProductDetails } from "@/components/products/____ProductDetails";
import ProductDialog from "@/components/products/ProductDialog";
import AlertComponent from "@/components/dialog/AlertDialog";
import MaintenanceStatus from "./MaintenanceStatus";
import { Center } from "../Center";

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
    : undefined;

  return (
    <>
      <Card className="w-[220px] h-[280px] lg:w-[450px] lg:h-[300px] flex flex-col">
        <CardContent className="relative">
          <div className="h-1/5">
            <div className="pt-4" />
            <CardDropdownMenu
              onEdit={() => setIsDialogOpen(true)}
              onDelete={() => setIsAlertOpen(true)}
            />
            <div className="flex items-center space-x-4 mb-4 ">
              <Avatar className="h-12 w-12">
                <AvatarImage src={imageUrl} alt={product.name} />
                <AvatarFallback>{product.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-md lg:text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {product.category || "No Category"}
                </p>
              </div>
            </div>
          </div>

          <div className="h-2/5 ">
            <Separator className="mb-4" />
            {product.lastOverallMaintenance ? (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <MaintenanceStatus
                  title="Last Task"
                  taskName={product.lastOverallMaintenance?.taskName}
                  date={product.lastOverallMaintenance?.lastMaintenance}
                  bgColor="bg-green-50"
                  textColor="text-green-700"
                  noDataText="No Maintenance Data"
                />

                <MaintenanceStatus
                  title="Next Task"
                  taskName={product.nextOverallMaintenance?.taskName}
                  date={product.nextOverallMaintenance?.nextMaintenance}
                  bgColor="bg-red-50"
                  textColor="text-red-700"
                  noDataText="No Upcoming Task"
                />
              </div>
            ) : (
              <Center className="">
                you didnt add any task for this product!
              </Center>
            )}
          </div>
          <div className="h-1/5">
            <Separator className="mt-4 mb-4" />

            <div className="flex flex-col sm:flex-row  sm:justify-between gap-2 ">
              <Button className="w-full" onClick={() => setIsDetailsOpen(true)}>
                <Eye className="h-4 w-4 mr-2" />
                More Details
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onViewTasks(product._id as string)}
              >
                <List className="h-4 w-4 mr-2" />
                View Tasks
              </Button>
            </div>
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
        onClose={() => setIsAlertOpen(false)}
        onConfirm={() => {
          onDelete(product._id as string);
          setIsAlertOpen(false);
        }}
      />
    </>
  );
}
