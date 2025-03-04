"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/context/authContext";
import AuthGuard from "@/modules/auth/AuthGuard";

import PageHeader from "@/components/layout/PageHeader";
import ProductListContainer from "@/modules/products/components/ProductListContainer";
import TaskListContainer from "@/modules/tasks/components/TaskListContainer";

const DESCRIPTION = "Here is an overview of your products and upcoming tasks";
export default function UserAreaPage() {
  const { user } = useAuth();

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
            title={`Welcome, ${user?.name}`}
            description={DESCRIPTION}
          />
          <ProductListContainer
            header={"Your Recent Products"}
            enablePagination={false}
            enableSearch={false}
          />
          <TaskListContainer
            header="Your Recent Tasks"
            paginationControls={false}
          />
        </motion.div>
      </div>
    </AuthGuard>
  );
}
