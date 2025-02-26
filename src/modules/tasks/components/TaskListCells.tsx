"use client";

import { TableCell } from "@/components/ui/table";
import { ITask } from "@/types/ITask";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardDropdownMenu } from "@/components/common/CardDropDownMenu";
import { getStatusColor } from "../utils/getStatusColor";
import { ClockIcon } from "lucide-react";

/**
 * Renders a table cell with formatted content.
 */
export const renderTableCell = (content: React.ReactNode) => (
  <TableCell className="py-2 px-4">{content}</TableCell>
);

/**
 * Renders the task name cell.
 */
export const renderTaskNameCell = (task: ITask) =>
  renderTableCell(<span className="font-medium">{task.taskName}</span>);

/**
 * Renders the task status cell with a colored badge.
 */
export const renderTaskStatusCell = (task: ITask) => {
  const { bgColor, textColor } = getStatusColor(task.status);
  return renderTableCell(
    <Badge className={`px-2 py-1 text-sm rounded ${bgColor} ${textColor}`}>
      {task.status}
    </Badge>
  );
};

/**
 * Renders the task due date cell.
 */
export const renderTaskDueDateCell = (task: ITask) =>
  renderTableCell(formatDate(task.nextMaintenance));

/**
 * Renders the "Complete Task" button.
 */
export const renderTaskCompleteButtonCell = (
  task: ITask,
  onComplete: (task: ITask) => void
) =>
  renderTableCell(
    <Button
      variant="secondary"
      size="sm"
      onClick={() => onComplete(task)}
      disabled={task.status === "completed"}
    >
      {task.status === "completed" ? "Completed" : "Complete Task"}
    </Button>
  );

/**
 * Renders the task actions menu.
 */
export const renderTaskActionsCell = (
  task: ITask,
  dropMenu: boolean,
  onEdit?: (task: ITask) => void,
  onDelete?: (task: ITask) => void,
  onPostpone?: (task: ITask) => void
) =>
  dropMenu && onEdit && onDelete
    ? renderTableCell(
        <CardDropdownMenu
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task)}
          menuItems={[
            {
              label: "Postpone Task",
              icon: <ClockIcon className="h-4 w-4" />,
              onClick: () => onPostpone?.(task),
            },
          ]}
        />
      )
    : null;
