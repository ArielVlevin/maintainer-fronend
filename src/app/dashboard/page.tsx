"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/authContext";
import { IProduct } from "@/types";
import { fetchProductTasks } from "@/api/tasks";
import AuthGuard from "@/components/auth/AuthGuard";
import { fetchUserProducts } from "@/api/product";
import FullScreenLoader from "@/components/common/FullScreenLoading";
import { useQuery } from "@tanstack/react-query";
import { NoProductsMessage } from "@/components/products/noProducts";
import { NoTasksMessage } from "@/components/tasks/NoTasks";
import { AddProductButton } from "@/components/products/ProductDialog";

export default function UserAreaPage() {
  const { user, isLoading: authLoading } = useAuth();
  const userName = user?.name || "Guest";

  // ✅ שליפת מוצרים עם `useQuery`
  const {
    data: products,
    isLoading: productsLoading,
    error,
  } = useQuery({
    queryKey: ["userProducts", user?._id], // מזהה ייחודי למטמון
    queryFn: fetchUserProducts,
    enabled: !!user, // קריאה לשרת תתבצע רק אם `user` נטען
    staleTime: 1000 * 60 * 1, // שמירת נתונים במטמון למשך1 דקות
  });

  // ✅ שליפת משימות לכל מוצר עם `useQuery`
  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ["productTasks", user?._id],
    queryFn: async () => {
      if (!products) return [];
      const allTasks = await Promise.all(
        products.products.map((product: IProduct) =>
          fetchProductTasks(product._id!)
        )
      );
      return allTasks.flat();
    },
    enabled: !!products, // קריאה תתבצע רק אחרי שהמוצרים נטענו
  });

  // ✅ מצב טעינה ושגיאות
  if (authLoading || productsLoading || tasksLoading)
    return <FullScreenLoader />;

  return (
    <AuthGuard>
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          {/* Welcome Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Welcome, {userName}</CardTitle>
              <CardDescription>
                Here is an overview of your products and upcoming tasks
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Products Section */}
          {products?.total === 0 ? (
            <NoProductsMessage />
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Your Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products?.products.map((product) => (
                      <div
                        key={product._id}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 p-4 border rounded-lg"
                      >
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              product.lastOverallMaintenance
                                ? "bg-green-200 text-green-800"
                                : "bg-yellow-200 text-yellow-800"
                            }`}
                          >
                            {product.lastOverallMaintenance
                              ? "Maintained"
                              : "Pending Maintenance"}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Last:{" "}
                            {product.lastOverallMaintenance
                              ? new Date(
                                  product.lastOverallMaintenance.lastMaintenance
                                ).toLocaleDateString()
                              : "N/A"}
                          </Button>
                          <Button variant="outline" size="sm">
                            Next:{" "}
                            {product.nextOverallMaintenance
                              ? new Date(
                                  product.nextOverallMaintenance.nextMaintenance
                                ).toLocaleDateString()
                              : "N/A"}
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <AddProductButton />
            </>
          )}
          {/* Tasks Section */}

          {products?.total !== 0 && (
            <>
              {tasks?.length !== 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Task</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead>Due Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tasks?.map((task) => (
                          <TableRow key={task._id}>
                            <TableCell>{task.taskName}</TableCell>
                            <TableCell>
                              {products?.products.find(
                                (p) => p._id === task.product_id
                              )?.name || "Unknown Product"}
                            </TableCell>
                            <TableCell>
                              {new Date(
                                task.nextMaintenance
                              ).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
              <Button className="w-full">Schedule New Maintenance</Button>
            </>
          )}
        </motion.div>
      </div>
    </AuthGuard>
  );
}

/*"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/authContext";
import { IProduct, IMaintenanceTask } from "@/types";
import { fetchProductTasks } from "@/api/tasks";
import AuthGuard from "@/components/auth/AuthGuard";
import { fetchUserProducts } from "@/api/product";
import FullScreenLoader from "@/components/common/FullScreenLoading";

export default function UserAreaPage() {
  const { user, isLoading } = useAuth();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [tasks, setTasks] = useState<IMaintenanceTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) return;

    const loadUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        // ✅ מביא רק את המוצרים של המשתמש המחובר
        const { products } = await fetchUserProducts();
        setProducts(products);

        // ✅ מביא את המשימות של כל מוצר
        const allTasks = await Promise.all(
          products.map((product: IProduct) => fetchProductTasks(product._id!))
        );

        setTasks(allTasks.flat()); // ממזג את כל המשימות למערך אחד
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user]);

  if (isLoading || loading) return <FullScreenLoader />;
  if (error) return <p className="text-red-500">{error}</p>;

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
              <CardTitle className="text-2xl">Welcome, {user?.name}</CardTitle>
              <CardDescription>
                Here is an overview of your products and upcoming tasks
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Products</CardTitle>
            </CardHeader>
            <CardContent>
              {products.length === 0 ? (
                <p className="text-center">No products added yet.</p>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            product.lastOverallMaintenance
                              ? "bg-green-200 text-green-800"
                              : "bg-yellow-200 text-yellow-800"
                          }`}
                        >
                          {product.lastOverallMaintenance
                            ? "Maintained"
                            : "Pending Maintenance"}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Last:{" "}
                          {product.lastOverallMaintenance
                            ? new Date(
                                product.lastOverallMaintenance.lastMaintenance
                              ).toLocaleDateString()
                            : "N/A"}
                        </Button>
                        <Button variant="outline" size="sm">
                          Next:{" "}
                          {product.nextOverallMaintenance
                            ? new Date(
                                product.nextOverallMaintenance.nextMaintenance
                              ).toLocaleDateString()
                            : "N/A"}
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              {tasks.length === 0 ? (
                <p className="text-center">No tasks scheduled yet.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task._id}>
                        <TableCell>{task.taskName}</TableCell>
                        <TableCell>
                          {products.find((p) => p._id === task.product_id)
                            ?.name || "Unknown Product"}
                        </TableCell>
                        <TableCell>
                          {new Date(task.nextMaintenance).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Button className="w-full">Schedule New Maintenance</Button>
        </motion.div>
      </div>
    </AuthGuard>
  );
}



*/
