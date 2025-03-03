import { z } from "zod";
import { addYears } from "date-fns";

// חישוב תאריכי מינימום ומקסימום
const today = new Date();
const maxDate = addYears(today, 2);

// Schema for maintenance window
const maintenanceWindowSchema = z.object({
  startDate: z
    .date({ required_error: "Start date is required" })
    .min(today, { message: "Start date cannot be in the past" })
    .max(maxDate, { message: "Start date cannot be more than 2 years ahead" }),
  endDate: z
    .date({ required_error: "End date is required" })
    .min(today, { message: "End date cannot be in the past" })
    .max(maxDate, { message: "End date cannot be more than 2 years ahead" }),
});

// Validation functions
const validateLastMaintenanceRecurring = (data: any) => {
  return data.isRecurring && data.recurringType === "lastMaintenance"
    ? !!data.lastMaintenance && !!data.frequency
    : true;
};

const validateDateRangeRecurring = (data: any) => {
  return data.isRecurring && data.recurringType === "dateRange"
    ? !!data.maintenanceWindowDates?.startDate &&
        !!data.maintenanceWindowDates?.endDate &&
        !!data.frequency
    : true;
};

const validateOneTimeTask = (data: any) => {
  return !data.isRecurring
    ? !!data.maintenanceWindowDates?.startDate &&
        !!data.maintenanceWindowDates?.endDate
    : true;
};

const validateEndDateAfterStartDate = (data: any) => {
  return data.maintenanceWindowDates?.startDate &&
    data.maintenanceWindowDates?.endDate
    ? data.maintenanceWindowDates.endDate >=
        data.maintenanceWindowDates.startDate
    : true;
};

// Main form schema
export const formSchema = z
  .object({
    product_id: z.string().min(1, { message: "Please select a product" }),
    task_id: z.string().optional(),
    taskName: z
      .string()
      .min(3, { message: "Task name is required, minimum of 3 characters" })
      .max(25, { message: "Task name cannot exceed 25 characters" }),

    description: z
      .string()
      .max(200, { message: "Description cannot exceed 200 characters" })
      .optional(),

    isRecurring: z.boolean(),
    recurringType: z.enum(["lastMaintenance", "nextMaintenance"]).optional(),

    status: z.enum(["maintenance", "completed", "overdue", "healthy"], {
      required_error: "Please select a status",
    }),

    lastMaintenance: z
      .date()
      .optional()
      .refine((date) => !date || (date >= today && date <= maxDate), {
        message: "Last maintenance date must be within the next 2 years",
      }),

    frequency: z
      .number()
      .positive("Frequency must be greater than 0")
      .max(365, { message: "Frequency cannot exceed 365 days" })
      .optional(),

    maintenanceWindowDates: maintenanceWindowSchema.optional(),
  })
  .refine(validateLastMaintenanceRecurring, {
    message:
      "Recurring tasks with last maintenance require a last maintenance date and frequency",
    path: ["lastMaintenance"],
  })
  .refine(validateDateRangeRecurring, {
    message:
      "Recurring tasks with date range require start date, end date, and frequency",
    path: ["maintenanceWindowDates"],
  })
  .refine(validateOneTimeTask, {
    message: "One-time tasks require a start date and end date",
    path: ["maintenanceWindowDates"],
  })
  .refine(validateEndDateAfterStartDate, {
    message: "End date must be after or equal to the start date",
    path: ["maintenanceWindowDates.endDate"],
  });

// Type definition for the form
export type TaskFormData = z.infer<typeof formSchema>;
