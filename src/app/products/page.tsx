"use client";

import { motion } from "framer-motion";
import AuthGuard from "@/modules/auth/AuthGuard";
import { Badge } from "@/components/ui/badge";
import ProductListContainer from "@/modules/products/components/ProductListContainer";
export default function ProductsPage() {
  return (
    <AuthGuard>
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto space-y-6"
        >
          <ProductListContainer />
        </motion.div>
      </div>
    </AuthGuard>
  );
}

// ✅ Status badge generator
const getStatusBadge = (status: string) => {
  switch (status) {
    case "Good":
      return <Badge className="bg-green-200 text-green-800">Good</Badge>;
    case "Needs Maintenance":
      return (
        <Badge className="bg-yellow-200 text-yellow-800">
          Needs Maintenance
        </Badge>
      );
    case "Under Repair":
      return <Badge className="bg-red-200 text-red-800">Under Repair</Badge>;
    default:
      return <Badge className="bg-gray-200 text-gray-800">Unknown</Badge>;
  }
};
