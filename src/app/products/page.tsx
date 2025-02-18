"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/authContext";
import FullScreenLoader from "@/components/common/FullScreenLoading";
import AuthGuard from "@/components/auth/AuthGuard";
import { useFetchData } from "@/hooks/useFetchData";
import { formatDate } from "@/lib/utils";
export default function ProductsPage() {
  const { user, isLoading: isAuthLoading } = useAuth();

  // 🛠 Fetch products
  const { data, isLoading, error } = useFetchData({
    fetchProducts: true,
    page: 1,
    limit: 10,
    userOnly: true,
  });

  const products = data?.productsData;

  // 🛠 Handle new product
  const [newProduct, setNewProduct] = useState({ name: "", category: "" });

  if (isAuthLoading || isLoading) return <FullScreenLoader />;
  if (error)
    return <p className="text-red-500 text-center">Failed to load products.</p>;

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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl">Products</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new product here.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Category
                      </Label>
                      <Input
                        id="category"
                        value={newProduct.category}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            category: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => {}}>Add Product</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {products?.products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Package className="h-16 w-16 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    No Products Yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    You haven not added any products to track. Start by adding
                    your first product!
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Maintenance</TableHead>
                      <TableHead>Next Maintenance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products?.products.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell className="font-medium">
                          {product.name}
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{getStatusBadge("")}</TableCell>
                        <TableCell>
                          {formatDate(
                            product.lastOverallMaintenance.lastMaintenance
                          )}
                        </TableCell>
                        <TableCell>
                          {formatDate(
                            product.nextOverallMaintenance.nextMaintenance
                          )}
                        </TableCell>
                        <TableCell>
                          <Link href={`/product/${product._id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
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
