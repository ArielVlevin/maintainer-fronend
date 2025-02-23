"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TaskStatusType } from "@/types/ITask";

interface TaskStatusFilterProps {
  statusFilter: TaskStatusType;
  setStatusFilter: (value: TaskStatusType) => void;
}

/**
 * @component TaskStatusFilter
 * @description Dropdown filter to allow users to filter tasks by status.
 *
 * @param {TaskStatusFilterProps} props - Component props.
 * @returns {JSX.Element} A select dropdown to filter tasks.
 */
export function TaskStatusFilter({
  statusFilter,
  setStatusFilter,
}: TaskStatusFilterProps) {
  return (
    <Select
      value={statusFilter}
      onValueChange={(value) => setStatusFilter(value as TaskStatusType)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
        <SelectItem value="overdue">Overdue</SelectItem>
        <SelectItem value="inactive">Inactive</SelectItem>
      </SelectContent>
    </Select>
  );
}
