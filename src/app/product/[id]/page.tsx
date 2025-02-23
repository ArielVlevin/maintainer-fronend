"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import AuthGuard from "@/components/auth/AuthGuard";
import { useProducts } from "@/hooks/useProduct";
import TaskListContainer from "@/features/tasks/TaskListContainer";

export default function ProductPage() {
  const { id } = useParams() as { id: string };
  const productSlug = id;

  const {
    data: productsData,
    isLoading,
    isError,
  } = useProducts({
    slug: productSlug,
  });

  const product = productsData?.items[0];

  if (isError || (!product && !isLoading))
    return <p className="text-red-500 text-center">Product not found.</p>;

  return (
    <AuthGuard>
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          {isLoading ? (
            <> loading...</>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{product?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">Category: {product?.category}</p>
                <p className="font-semibold">
                  Tags: {(product?.tags as string[]).join(", ") || "N/A"}
                </p>
              </CardContent>
            </Card>
          )}

          <TaskListContainer product={product} enableSearch dropMenu={true} />
        </motion.div>
      </div>
    </AuthGuard>
  );
}
