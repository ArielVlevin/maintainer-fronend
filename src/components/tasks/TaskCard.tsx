"use client";

import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IMaintenanceTask } from "@/types";
import AlertComponent from "../common/AlertDialog";
import { useState } from "react";
import TaskDialog from "./TaskDialog";
import { CardDropdownMenu } from "../app-ui/card/CardDropDownMenu";

interface TaskCardProps {
  task: IMaintenanceTask;
  onTakeCare: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onTakeCare, onDelete }: TaskCardProps) {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("he-IL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  return (
    <>
      <Card className="w-full max-w-md mx-auto shadow-md rounded-lg">
        <CardHeader>
          <div className="flex justify-between items-start mb-4">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-800">
                {task.taskName}
              </CardTitle>
              {task.description && (
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
              )}
            </div>
            <CardDropdownMenu
              onEdit={() => setIsDialogOpen(true)}
              onDelete={() => setIsAlertOpen(true)}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-2">
          <p className="text-sm flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span className="font-semibold">🛠️ Last Maintenance:</span>{" "}
            {task.lastMaintenance
              ? formatDate(task.lastMaintenance)
              : "No Data"}
          </p>
          <p className="text-sm flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span className="font-semibold">⏳ Next Maintenance:</span>{" "}
            {task.nextMaintenance
              ? formatDate(task.nextMaintenance)
              : "No Upcoming Maintenance"}
          </p>

          <div className="flex justify-end mt-4">
            <Button onClick={() => onTakeCare(task._id as string)}>
              Mark as Done
            </Button>
          </div>
        </CardContent>
      </Card>
      <TaskDialog
        product_id={task.product_id}
        taskId={task._id}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <AlertComponent
        title="Are you sure you want to delete this product?"
        description={`"${task.taskName}" will be permanently removed.`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)} //  Close the alert dialog
        onConfirm={() => {
          onDelete(task._id as string);
          setIsAlertOpen(false); //  Close after deletion
        }}
      />
    </>
  );
}
