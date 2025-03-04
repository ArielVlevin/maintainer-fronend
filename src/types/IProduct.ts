import { ITask } from "./ITask";

/**
 * Represents a product that requires maintenance.
 */
export interface IProduct {
  _id?: string; // Optional unique identifier for the product (MongoDB ID)
  user_id?: string;
  name: string; // Name of the product
  slug: string;

  category?: string; // Optional category of the product
  tags?: string[]; // Tags associated with the product (string or array)

  manufacturer?: string; // Optional manufacturer name
  model?: string; // Optional model name

  purchaseDate?: Date; // The date the product was purchased
  tasks: string[] | ITask[]; // Array of maintenance tasks associated with the product
  lastOverallMaintenance?: ITask; // Last completed maintenance task
  nextOverallMaintenance?: ITask; // Upcoming maintenance task

  iconUrl?: string; // URL to the product icon
  bgColor?: string; // Optional background color for UI display
}
