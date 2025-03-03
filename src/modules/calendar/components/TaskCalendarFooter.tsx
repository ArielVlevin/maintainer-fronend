import moment from "moment";
import { CalendarEvent } from "@/types/ICalander";
import { Button } from "@/components/ui/button";
import { AddTaskButton } from "../../tasks/dialogs/___TaskDialog";

interface TaskCalendarFooterProps {
  selectedDate: Date | null;
  tasksForSelectedDate: CalendarEvent[];
  onSelectTask: (task: CalendarEvent) => void;
}

export function TaskCalendarFooter({
  selectedDate,
  tasksForSelectedDate,
  onSelectTask,
}: TaskCalendarFooterProps) {
  if (!selectedDate) return null;

  return (
    <div className="mt-4 p-4 border rounded-lg shadow bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">
          Tasks for {moment(selectedDate).format("MMMM Do, YYYY")}
        </h2>
      </div>
      {tasksForSelectedDate.length > 0 && (
        <ul className="mt-2 space-y-2">
          {tasksForSelectedDate.map((task: CalendarEvent) => (
            <li
              key={task._id}
              className="p-3 border rounded flex justify-between"
            >
              <span className="flex flex-col">
                <span className="font-bold text-gray-800">
                  Task: {task.title}
                </span>
                <span>Product: {task.product.name}</span>
              </span>
              <Button onClick={() => onSelectTask(task)}>View</Button>
            </li>
          ))}
        </ul>
      )}
      <ul className="mt-2 space-y-2">
        <li className="p-3 border rounded flex justify-between">
          <span>
            <p className="text-gray-500 mb-2">
              {tasksForSelectedDate.length === 0
                ? "No tasks for this day."
                : "Add more tasks"}
            </p>
          </span>
          <AddTaskButton date={selectedDate} />
        </li>
      </ul>
    </div>
  );
}
