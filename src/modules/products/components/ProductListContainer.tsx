"use client";

import React, { useState } from "react";
import { useProductActions } from "@/modules/products/hooks/useProductActions";
import ProductList from "./ProductList";
import ProductDialog from "@/modules/products/dialogs/ProductDialog";
import ConfirmDeleteDialog from "@/components/dialog/ConfirmDeleteDialog";
import { useProducts } from "@/modules/products/hooks/useProduct";
import ProductListSkeleton from "../styles/ProductListSkeleton";
import { NoProductsMessage } from "./NoProductsMessage";
import { IProduct } from "@/types/IProduct";
import { useNotification } from "@/context/NotificationContext";
import { AddProductButton } from "../dialogs/AddProductButton";
import Pagination from "@/components/table/Pagination";

/**
 * @component ProductListContainer
 * @description Manages API calls and state for `ProductList`.
 */
export default function ProductListContainer({
  header = "Products",
  enableSearch = false,
  enablePagination = true,
}: {
  header?: string;
  enableSearch?: boolean;
  enablePagination?: boolean;
}) {
  const { showError } = useNotification();
  const { deleteMutation } = useProductActions();

  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const { data, isLoading, isError, error } = useProducts({
    page,
    limit,
  });

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  if (isLoading) return <ProductListSkeleton />;
  if (isError) showError(error?.message || "Failed to load tasks.");
  if (!data || !data.items) return <NoProductsMessage />;

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{header}</h2>
        <AddProductButton />
      </div>

      <ProductList
        products={data.items}
        enableSearch={enableSearch}
        onEdit={(product) => {
          setSelectedProduct(product);
          setEditDialogOpen(true);
        }}
        onDelete={(product) => {
          setSelectedProduct(product);
          setDeleteDialogOpen(true);
        }}
      />

      {enablePagination && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}

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
          product_id={selectedProduct._id}
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
        />
      )}
    </>
  );
}
