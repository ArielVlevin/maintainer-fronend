"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/context/authContext";
import AuthGuard from "@/components/auth/AuthGuard";
import FullScreenLoader from "@/components/common/FullScreenLoading";

import { useFetchData } from "@/hooks/useFetchData";
import TaskList from "@/components/tasks/TaskList";
import ProductList from "@/components/products/ProductList";
import PageHeader from "@/components/layout/PageHeader";

const DESCRIPTION = "Here is an overview of your products and upcoming tasks";
export default function UserAreaPage() {
  const { user, isLoading: authLoading } = useAuth();

  const userName = user?.name || "Guest";

  const {
    productsData: products,
    tasksData: tasks,
    isLoading: fetchLoading,
  } = useFetchData({
    fetchProducts: true,
    fetchTasks: true,
  });

  if (authLoading || fetchLoading) return <FullScreenLoader />;

  return (
    <AuthGuard>
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <PageHeader
            title={`Welcome, ${userName}`}
            description={DESCRIPTION}
          />

          <ProductList products={products?.items || []} />
          {products?.total ? <TaskList tasks={tasks?.items || []} /> : null}
        </motion.div>
      </div>
    </AuthGuard>
  );
}
