/**
 * Represents a maintenance task associated with a product.
 */
export interface ITask {
  _id?: string;
  user_id: string;
  product_id: string;

  taskName: string;
  description?: string;
  status: TaskStatusType;

  lastMaintenance?: Date;
  isRecurring: boolean;
  frequency?: number;
  nextMaintenance?: Date;
  maintenanceWindowDays?: number;
  maintenanceWindowDates?: {
    startDate: Date;
    endDate: Date;
  };

  createdAt?: Date;
  updatedAt?: Date;
}

export type TaskStatusType =
  | "maintenance"
  | "completed"
  | "overdue"
  | "healthy"
  | "all";
