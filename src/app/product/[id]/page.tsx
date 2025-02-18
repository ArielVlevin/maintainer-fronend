"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { motion } from "framer-motion";
import { useAuth } from "@/context/authContext";
import FullScreenLoader from "@/components/common/FullScreenLoading";
import AuthGuard from "@/components/auth/AuthGuard";
import { NoTasksMessage } from "@/components/tasks/NoTasksMessage";
import { AddTaskButton } from "@/components/tasks/TaskDialog";
import { formatDate } from "@/lib/utils";
import { useFetchData } from "@/hooks/useFetchData";
import { IProduct } from "@/types/IProduct";
import { ITask } from "@/types/ITask";

export default function ProductPage() {
  const { id } = useParams() as { id: string };
  const productId = id;

  const { user, isLoading: isAuthLoading } = useAuth();

  const { data, isLoading, isError } = useFetchData({
    fetchProducts: true,
    productId, // Fetch a specific product and its tasks
    page: 1,
    limit: 10,
  });

  console.log("data::", data);
  const product = data?.productWithTasks?.product as IProduct;
  const tasks = data?.productWithTasks?.product.Tasks as ITask[];

  if (isAuthLoading || isLoading) return <FullScreenLoader />;
  if (isError)
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
          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Category:</p>
                  <p>{product.category}</p>
                </div>
                <div>
                  <p className="font-semibold">Status:</p>
                  <p>{product.status || "N/A"}</p>
                </div>
                <div>
                  <p className="font-semibold">Last Maintenance:</p>
                  <p>
                    {formatDate(product.lastOverallMaintenance.lastMaintenance)}{" "}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Next Maintenance:</p>
                  <p>
                    {formatDate(product.nextOverallMaintenance.nextMaintenance)}{" "}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Task Management */}

          {tasks && tasks.length === 0 ? (
            <NoTasksMessage product_id={productId} />
          ) : (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl">Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Task</TableHead>
                        <TableHead>Due Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tasks?.map((task) => (
                        <TableRow key={task._id}>
                          <TableCell>{task.taskName}</TableCell>
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
              <AddTaskButton productId={productId} />
            </>
          )}
        </motion.div>
      </div>
    </AuthGuard>
  );
}
