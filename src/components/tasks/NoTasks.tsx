import { useState } from "react";
import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskDialog from "@/components/tasks/TaskDialog";

/**
 * @component NoTasksMessage
 * @description Displays a message when no upcoming tasks are available, allowing users to add a new task.
 *
 * @param {string} product_id - The ID of the product to which the task will be assigned.
 *
 * @returns {JSX.Element} The No Tasks UI.
 */
export function NoTasksMessage({ product_id }: { product_id: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Calendar className="h-16 w-16 text-blue-600 mb-4" />
      <h3 className="text-xl font-semibold mb-2">No Upcoming Tasks</h3>
      <p className="text-gray-600 mb-4">
        You do not have any scheduled tasks. Start by adding a new maintenance
        task!
      </p>
      <Button
        className="flex items-center"
        onClick={() => setIsDialogOpen(true)}
      >
        <Plus className="h-4 w-4 mr-2" />
        Schedule New Task
      </Button>

      {/* ✅ דיאלוג להוספת משימה */}
      <TaskDialog
        product_id={product_id}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}
