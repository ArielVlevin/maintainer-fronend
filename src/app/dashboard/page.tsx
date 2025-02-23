"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/context/authContext";
import AuthGuard from "@/components/auth/AuthGuard";

import PageHeader from "@/components/layout/PageHeader";
import ProductListContainer from "@/features/products/ProductListContainer";
import TaskListContainer from "@/features/tasks/TaskListContainer";
import TaskCalendar from "@/features/calendar/TaskCalendar";

const DESCRIPTION = "Here is an overview of your products and upcoming tasks";
export default function UserAreaPage() {
  const { user, isLoading: authLoading } = useAuth();

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
            title={`Welcome, ${authLoading ? "Guest" : user?.name}`}
            description={DESCRIPTION}
          />

          <div className="bg-white">
            <TaskCalendar />
          </div>
          <ProductListContainer />
          <TaskListContainer paginationControls={false} />
        </motion.div>
      </div>
    </AuthGuard>
  );
}
