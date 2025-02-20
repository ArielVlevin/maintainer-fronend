"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITask } from "@/types/ITask";
import { formatDate } from "@/lib/utils";
import { AddTaskButton } from "@/components/tasks/TaskDialog";
import { NoTasksMessage } from "./NoTasksMessage";

/**
 * @component TaskList
 * @description Displays a list of tasks associated with a product.
 *
 * @param {object} props - Component props.
 * @param {ITask[]} props.tasks - Array of tasks to display.
 * @param {string} props.productId - Product ID associated with the tasks.
 * @returns {JSX.Element} The task list UI.
 */
export default function TaskList({
  tasks,
  productId,
}: {
  tasks: ITask[];
  productId?: string;
}) {
  if (!tasks || tasks.length === 0) return <NoTasksMessage />;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Tasks</CardTitle>
          <AddTaskButton productId={productId} />
        </div>
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
            {tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task.taskName}</TableCell>
                <TableCell>{formatDate(task.nextMaintenance)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
