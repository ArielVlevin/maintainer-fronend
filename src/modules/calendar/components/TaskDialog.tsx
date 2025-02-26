import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon, Edit2Icon } from "lucide-react";
import moment from "moment";
import { CalendarEvent } from "@/types/ICalander";

interface TaskDialogProps {
  task: CalendarEvent | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskDialog({
  task,
  onClose,
  onEdit,
  onDelete,
}: TaskDialogProps) {
  if (!task) return null;

  return (
    <Dialog open={!!task} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>
        <p>
          <strong>Product:</strong> {task.product.name || "No description"}
        </p>
        <p>
          <strong>Date:</strong> {moment(task.start).format("MMMM Do, YYYY")}
        </p>
        <p>
          <strong>Description:</strong> {task.description || "No description"}
        </p>

        <div className="flex justify-between mt-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={onEdit}
          >
            <Edit2Icon className="h-4 w-4" />
            Edit Task
          </Button>
          <Button
            variant="destructive"
            className="flex items-center gap-2"
            onClick={onDelete}
          >
            <Trash2Icon className="h-4 w-4" />
            Delete Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
