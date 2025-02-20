"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { useAuth } from "@/context/authContext";
import FullScreenLoader from "@/components/common/FullScreenLoading";
import AuthGuard from "@/components/auth/AuthGuard";
import { useFetchData } from "@/hooks/useFetchData";
import ProductList from "@/components/products/ProductList";
import { Badge } from "@/components/ui/badge";
export default function ProductsPage() {
  const { user, isLoading: isAuthLoading } = useAuth();

  // 🛠 Fetch products
  const { productsData, isLoading } = useFetchData({
    fetchProducts: true,
  });

  const products = productsData?.items;

  if (isAuthLoading || isLoading) return <FullScreenLoader />;

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

  return (
    <AuthGuard>
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto space-y-6"
        >
          <ProductList products={products || []} />
        </motion.div>
      </div>
    </AuthGuard>
  );
}

/*
     <div className="container mx-auto py-8 p-8">
        <div className="flex flex-col gap-4 justify-center items-center lg:w-2/3">
          <h1 className="text-2xl font-bold">Products</h1>

          <Button onClick={() => setIsOpen(true)} className="w-1/2 ">
            New Product
          </Button>

          <ProductList />
        </div>
        <ProductDialog open={isOpen} onClose={() => setIsOpen(false)} />
      </div>
      
      */
