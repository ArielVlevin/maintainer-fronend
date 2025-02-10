/**
 * Represents a maintenance task associated with a product.
 */
export interface IMaintenanceTask {
  _id?: string; // Optional unique identifier for the task (MongoDB ID)
  product_id: string; // The ID of the associated product
  taskName: string; // Name of the maintenance task
  description?: string; // Optional description of the task
  lastMaintenance: Date; // Last performed maintenance date
  frequency: number; // Maintenance frequency in days
  nextMaintenance: Date; // Next scheduled maintenance date
}

/**
 * Represents a product that requires maintenance.
 */
export interface IProduct {
  _id?: string; // Optional unique identifier for the product (MongoDB ID)
  user_id: string;
  name: string; // Name of the product
  category?: string; // Optional category of the product
  tags?: string[] | string; // Tags associated with the product (string or array)

  manufacturer?: string; // Optional manufacturer name
  model?: string; // Optional model name

  purchaseDate: Date; // The date the product was purchased
  maintenanceTasks: IMaintenanceTask[]; // Array of maintenance tasks associated with the product
  lastOverallMaintenance?: IMaintenanceTask; // Last completed maintenance task
  nextOverallMaintenance?: IMaintenanceTask; // Upcoming maintenance task

  iconUrl?: string; // URL to the product icon
  bgColor?: string; // Optional background color for UI display
}

/**
 * @interface IUser
 * @description Defines the user structure in the application.
 */
export interface IUser {
  _id: string; // Unique identifier for the user
  name: string; // Full name of the user
  email: string; // Email address
  image?: string | null; // Profile picture URL (optional)
  emailVerified?: boolean | null; // Indicates if the email is verified
  role?: "user" | "admin"; // User role in the system
  products?: string[]; // List of product IDs associated with the user
  profileCompleted?: boolean; // Indicates if the user has completed their profile
  createdAt?: string; // Date when the user was created
}
