import { Field } from "@/components/input/Field";
import { useFormContext } from "react-hook-form";

export default function TaskFields() {
  const { watch } = useFormContext();
  const isRecurring = watch("isRecurring");
  const recurringType = watch("recurringType");

  return (
    <div className="space-y-6">
      {/* Task Name */}
      <Field name="taskName" label="Task Name" />

      {/* Description */}
      <Field name="description" label="Description" />

      {/* Is Recurring */}
      <Field
        name="isRecurring"
        label="Recurring Task"
        description="Is this a task that repeats regularly?"
        type="switch"
      />

      {/* Recurring Type */}
      {isRecurring && (
        <Field
          name="recurringType"
          label="Recurring Task Type"
          type="select"
          options={[
            { value: "lastMaintenance", label: "Last Maintenance Date" },
            { value: "nextMaintenance", label: "Next Maintenance Dates" },
          ]}
        />
      )}

      {/* Last Maintenance */}
      {isRecurring && recurringType === "lastMaintenance" && (
        <Field
          name="lastMaintenance"
          label="Last Maintenance Date"
          type="date"
        />
      )}

      {/* Maintenance Window Start Date */}
      {!isRecurring || recurringType !== "lastMaintenance" ? (
        <>
          <Field
            name="maintenanceWindowDates.startDate"
            label="Start Date"
            type="date"
          />
          <Field
            name="maintenanceWindowDates.endDate"
            label="End Date"
            type="date"
          />
        </>
      ) : null}

      {/* Frequency */}
      {isRecurring && (
        <Field name="frequency" label="Frequency (Days)" type="number" />
      )}
    </div>
  );
}
