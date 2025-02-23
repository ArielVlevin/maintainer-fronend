"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

/**
 * Props for PostponeTaskDialog.
 */
interface PostponeTaskDialogProps {
  taskId: string;
  open: boolean;
  onClose: () => void;
  onPostpone: (taskId: string, days: number) => void;
}

/**
 * Dialog for postponing a task by a user-selected number of days.
 */
export function PostponeTaskDialog({
  taskId,
  open,
  onClose,
  onPostpone,
}: PostponeTaskDialogProps) {
  const [days, setDays] = useState<number>(7);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Postpone Task</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <p>Select the number of days to postpone the task:</p>
          <Select
            onValueChange={(value) => setDays(parseInt(value, 10))}
            defaultValue="7"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Day</SelectItem>
              <SelectItem value="3">3 Days</SelectItem>
              <SelectItem value="7">7 Days</SelectItem>
              <SelectItem value="14">14 Days</SelectItem>
              <SelectItem value="30">30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onPostpone(taskId, days);
              onClose();
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
