/**
 * Represents a maintenance task associated with a product.
 */
export interface ITask {
  _id?: string;
  user_id: string;
  product_id: string; // The ID of the associated product

  taskName: string; // Name of the maintenance task
  description?: string; // Optional description of the task
  frequency: number; // Maintenance frequency in days
  nextMaintenance: Date; // Next scheduled maintenance date
  lastMaintenance: Date; // Last performed maintenance date
}
