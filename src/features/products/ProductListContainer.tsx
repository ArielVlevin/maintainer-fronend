"use client";

import { useState } from "react";
import { useProductActions } from "@/hooks/useProductActions";
import ProductList from "./ProductList";
import ProductDialog from "@/features/products/ProductDialog";
import ConfirmDeleteDialog from "@/components/common/ConfirmDeleteDialog";
import { AddProductButton } from "@/features/products/ProductDialog";
import { useProducts } from "@/hooks/useProduct";
import ProductListSkeleton from "./ProductListSkeleton";
import { NoProductsMessage } from "./NoProductsMessage";
import { IProduct } from "@/types/IProduct";
import { useErrorHandler } from "@/context/ErrorContext";

/**
 * @component ProductListContainer
 * @description Manages API calls and state for `ProductList`.
 */
export default function ProductListContainer() {
  const { showError } = useErrorHandler();

  const { data, isLoading, isError, error } = useProducts({});
  const { deleteMutation } = useProductActions();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  if (isLoading) return <ProductListSkeleton />;
  if (isError) showError(error?.message || "Failed to load tasks.");
  if (!data || !data.items) return <NoProductsMessage />;
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manage Products</h2>
        <AddProductButton />
      </div>

      <ProductList
        products={data.items}
        onEdit={(product) => {
          setSelectedProduct(product);
          setEditDialogOpen(true);
        }}
        onDelete={(product) => {
          setSelectedProduct(product);
          setDeleteDialogOpen(true);
        }}
      />

      <ConfirmDeleteDialog
        title="Confirm Deletion"
        description="This action cannot be undone. To confirm, type:"
        confirmText={selectedProduct?.name || "Delete"}
        onConfirm={() => {
          if (selectedProduct) {
            deleteMutation.mutate(selectedProduct._id!);
          }
          setDeleteDialogOpen(false);
        }}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />

      {selectedProduct && (
        <ProductDialog
          productId={selectedProduct._id}
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
        />
      )}
    </>
  );
}
