"use client";
import { TaskStatusType } from "@/types/ITask";

/**
 * Returns the appropriate color classes for a given task status.
 */
export const getStatusColor = (status: TaskStatusType) => {
  switch (status) {
    case "completed":
      return { bgColor: "bg-green-500", textColor: "text-white" };
    case "overdue":
      return { bgColor: "bg-red-500", textColor: "text-white" };
    case "pending":
      return { bgColor: "bg-yellow-500", textColor: "text-black" };
    case "inactive":
      return { bgColor: "bg-blue-300", textColor: "text-white" };
    default:
      return { bgColor: "bg-gray-500", textColor: "text-white" };
  }
};
