import FormField from "@/components/app-ui/FormField";
/**
 * `TaskFields` Component
 *
 * This component renders a set of form fields for creating or editing a maintenance task.
 * It includes inputs for task name, description, last maintenance date, and frequency.
 *
 * @component
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.formData - The current task data.
 * @param {string} props.formData.taskName - The name of the task.
 * @param {string} [props.formData.description] - (Optional) A brief description of the task.
 * @param {string | Date} props.formData.lastMaintenance - The date of the last maintenance.
 * @param {number} props.formData.frequency - The frequency of maintenance in days.
 * @param {Function} props.handleChange - Function to handle input field changes.
 *
 * @returns {JSX.Element} The rendered task fields.
 *
 * @dependencies
 * - `FormField` for reusable input fields.
 *
 * @example
 * ```tsx
 * <TaskFields
 *   formData={{
 *     taskName: "Oil Change",
 *     description: "Change engine oil",
 *     lastMaintenance: new Date(),
 *     frequency: 30
 *   }}
 *   handleChange={(e) => console.log(e.target.value)}
 * />
 * ```
 */

interface TaskFieldsProps {
  formData: {
    taskName: string;
    description?: string;
    lastMaintenance: string | Date;
    frequency: number;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TaskFields: React.FC<TaskFieldsProps> = ({ formData, handleChange }) => {
  return (
    <>
      {/* Task Name Field */}
      <FormField
        label="Task Name"
        type="text"
        name="taskName"
        placeholder="Enter task name"
        value={formData.taskName}
        onChange={handleChange}
        required
      />

      {/* Task Description Field */}
      <FormField
        label="Description"
        type="text"
        name="description"
        placeholder="Optional task description"
        value={String(formData.description || "")}
        onChange={handleChange}
      />

      <FormField
        label="Last Maintenance Date"
        type="date"
        name="lastMaintenance"
        value={
          formData.lastMaintenance
            ? new Date(formData.lastMaintenance).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0]
        }
        onChange={handleChange}
        required
      />

      {/* Maintenance Frequency Field */}
      <FormField
        label="Frequency (Days)"
        type="number"
        name="frequency"
        value={formData.frequency.toString()}
        onChange={handleChange}
        required
      />
    </>
  );
};

export default TaskFields;
