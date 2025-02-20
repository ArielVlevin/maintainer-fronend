"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useAuth } from "@/context/authContext";
import FullScreenLoader from "@/components/common/FullScreenLoading";
import AuthGuard from "@/components/auth/AuthGuard";
import { IProduct } from "@/types/IProduct";
import { ITask } from "@/types/ITask";
import TaskList from "@/components/tasks/TaskList";
import { useProducts } from "@/hooks/useProductFetch";

export default function ProductPage() {
  const { id } = useParams() as { id: string };
  const productId = id;

  const { user, isLoading: isAuthLoading } = useAuth();

  const {
    data: productsData,
    isLoading,
    isError,
  } = useProducts({
    productId,
  });
  const product = productsData as IProduct;
  const tasks = (product.tasks as ITask[]) || [];

  if (isAuthLoading || isLoading) return <FullScreenLoader />;
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
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">Category: {product.category}</p>
              <p className="font-semibold">
                Tags: {(product.tags as string[]).join(", ") || "N/A"}
              </p>
            </CardContent>
          </Card>

          {/* Use the TaskList component */}
          <TaskList tasks={tasks} productId={productId} />
        </motion.div>
      </div>
    </AuthGuard>
  );
}
