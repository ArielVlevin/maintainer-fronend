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
import AuthGuard from "@/components/auth/AuthGuard";
import FullScreenLoader from "@/components/common/FullScreenLoading";
import { NoProductsMessage } from "@/components/products/NoProductsMessage";
import { NoTasksMessage } from "@/components/tasks/NoTasksMessage";
import { AddProductButton } from "@/components/products/ProductDialog";
import { ITask } from "@/types/ITask";
import { AddTaskButton } from "@/components/tasks/TaskDialog";
import { useFetchData } from "@/hooks/useFetchData";

export default function UserAreaPage() {
  const { user, isLoading: authLoading } = useAuth();

  const userName = user?.name || "Guest";

  const {
    data,
    isLoading: fetchLoading,
    error,
  } = useFetchData({
    fetchProducts: true,
    fetchTasks: true,
    page: 1,
    limit: 10,
    userOnly: true,
  });

  // Extract products and tasks separately
  const products = data?.productsData;
  const tasks = data?.tasksData;

  if (error) return <div>error: {error.message}</div>;
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
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold">
                      Your Products
                    </CardTitle>
                    <AddProductButton />
                  </div>
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
                                  (
                                    product.lastOverallMaintenance as ITask
                                  ).lastMaintenance
                                ).toLocaleDateString()
                              : "N/A"}
                          </Button>
                          <Button variant="outline" size="sm">
                            Next:{" "}
                            {product.nextOverallMaintenance
                              ? new Date(
                                  (
                                    product.nextOverallMaintenance as ITask
                                  ).nextMaintenance
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
            </>
          )}
          {/* Tasks Section */}

          {products?.total !== 0 && (
            <>
              {tasks?.total === 0 ? (
                <NoTasksMessage />
              ) : (
                tasks?.total !== 0 && (
                  <>
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-2xl font-bold">
                            Upcoming Tasks
                          </CardTitle>
                          <AddTaskButton />
                        </div>
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
                            {tasks?.tasks.map((task) => (
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
                  </>
                )
              )}
            </>
          )}
        </motion.div>
      </div>
    </AuthGuard>
  );
}
