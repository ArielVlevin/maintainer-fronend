"use client";

import { TableRow } from "@/components/ui/table";
import { ITask, TaskStatusType } from "@/types/ITask";
import GenericList from "@/components/table/GenericList";
import { TaskStatusFilter } from "./TaskStatusFilter";
import {
  renderTaskNameCell,
  renderTaskStatusCell,
  renderTaskDueDateCell,
  renderTaskCompleteButtonCell,
  renderTaskActionsCell,
} from "./TaskListCells";
import { useState } from "react";
import { IProduct } from "@/types/IProduct";

/**
 * @component TaskList
 * @description Displays a list of tasks using the generic list component.
 */
export default function TaskList({
  product,
  tasks,
  enableSearch = false,
  dropMenu = false,
  onEdit,
  onDelete,
  onComplete,
  onPostpone,
}: {
  tasks: ITask[];
  product?: IProduct;
  enableSearch?: boolean;
  dropMenu?: boolean;
  onEdit?: (task: ITask) => void;
  onDelete?: (task: ITask) => void;
  onComplete: (task: ITask) => void;
  onPostpone: (task: ITask) => void;
}) {
  const [statusFilter, setStatusFilter] = useState<TaskStatusType>("all");

  // ✅ Filter tasks based on status selection
  const filteredTasks =
    statusFilter === "all"
      ? tasks
      : tasks.filter((task) => task.status === statusFilter);

  return (
    <>
      <GenericList
        title={product?.name ? `Tasks for ${product?.name}` : "Your Tasks"}
        data={filteredTasks}
        searchKeys={["taskName", "nextMaintenance"]}
        enableSearch={enableSearch}
        headers={
          dropMenu && onEdit && onDelete
            ? ["Task Name", "Status", "Due Date", "Complete", "Actions"]
            : ["Task Name", "Status", "Due Date", "Complete"]
        }
        extraContent={
          <div className="flex gap-2 mb-6">
            <TaskStatusFilter
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </div>
        }
        renderRow={(task: ITask) => (
          <TableRow key={task._id}>
            {renderTaskNameCell(task)}
            {renderTaskStatusCell(task)}
            {renderTaskDueDateCell(task)}
            {renderTaskCompleteButtonCell(task, onComplete)}
            {renderTaskActionsCell(
              task,
              dropMenu,
              onEdit,
              onDelete,
              onPostpone
            )}
          </TableRow>
        )}
      />
    </>
  );
}
