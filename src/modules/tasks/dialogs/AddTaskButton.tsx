import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TaskDialog from "./TaskDialog";

interface AddTaskButtonProps {
  productId?: string;
  className?: string;
  date?: Date;
}

export function AddTaskButton({
  productId,
  date,
  className = "flex items-center",
}: AddTaskButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button className={cn(className)} onClick={() => setIsDialogOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        New Task
      </Button>

      {/* ✅ Task Dialog for Adding a New Task */}
      {isDialogOpen && (
        <TaskDialog
          product_id={productId}
          date={date}
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </>
  );
}
