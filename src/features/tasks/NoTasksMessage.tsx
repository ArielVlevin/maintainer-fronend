import { Calendar } from "lucide-react";
import TaskDialog from "@/features/tasks/TaskDialog";
import { NoDataMessage } from "@/components/app-ui/NoDataMessage";

const TITLE = "No Upcoming Tasks";
const DESCRIPTION =
  "You do not have any scheduled tasks. Start by adding a new maintenance task!";
const BTN_TEXT = "Add Task";

/**
 * @component NoTasksMessage
 * @description Displays a message when no upcoming tasks are available.
 *
 * @param {string} product_id - The ID of the product to which the task will be assigned.
 *
 * @returns {JSX.Element} The No Tasks UI.
 */
export function NoTasksMessage({ product_id }: { product_id?: string }) {
  return (
    <NoDataMessage
      icon={<Calendar className="h-16 w-16 text-blue-600 mb-4" />}
      title={TITLE}
      description={DESCRIPTION}
      AddDialog={TaskDialog}
      buttonText={BTN_TEXT}
      dialogProps={{ product_id }}
    />
  );
}
