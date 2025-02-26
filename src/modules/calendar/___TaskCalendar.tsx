"use client";

import { useState } from "react";
import {
  Calendar,
  momentLocalizer,
  Views,
  Event,
  View,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/features/calendar/style/calendar.css";

import { useTaskCalendar } from "@/modules/calendar/hooks/useTaskCalendar";
import { useTaskActions } from "@/modules/tasks/hooks/useTaskActions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Trash2Icon,
  Edit2Icon,
  PlusCircleIcon,
  View as ViewIcon,
} from "lucide-react";

const localizer = momentLocalizer(moment);

const CustomDateHeader = ({
  label,
  date,
  selectedDate,
}: {
  label: string;
  date: Date;
  selectedDate: Date | null;
}) => {
  const isSelected = selectedDate && moment(date).isSame(selectedDate, "day");
  return (
    <div
      className={`text-center font-semibold text-sm p-1 ml-1 ${
        isSelected ? "bg-blue-300 text-white rounded-sm mb-1 " : "text-black"
      }`}
    >
      {label}
    </div>
  );
};
interface TaskCalendarProps {
  productId?: string;
}

export default function TaskCalendar({ productId }: TaskCalendarProps) {
  const router = useRouter();
  const { deleteMutation } = useTaskActions();

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTask, setSelectedTask] = useState<Event | null>(null);
  const [view, setView] = useState<View>("month");

  const { data: events, isLoading } = useTaskCalendar({ productId });

  // ✅ סינון משימות לפי התאריך הנבחר
  const tasksForSelectedDate = selectedDate
    ? events?.filter(
        (event: Event) =>
          moment(event.start).format("YYYY-MM-DD") ===
          moment(selectedDate).format("YYYY-MM-DD")
      ) || []
    : [];

  // ✅ מעבר בין חודשים
  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  // ✅ פתיחת דיאלוג עם פרטי משימה
  const handleEventSelect = (event: Event) => {
    setSelectedTask(event);
  };

  // ✅ מחיקת משימה
  const handleDeleteTask = async (task: Event) => {
    await deleteMutation.mutateAsync(task.id);
    setSelectedTask(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Task Calendar</h2>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Calendar
            localizer={localizer}
            events={events || []}
            startAccessor="start"
            endAccessor="end"
            views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
            view={view}
            step={1440}
            timeslots={1}
            style={{ height: 600 }}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: "#3b82f6",
                borderRadius: "6px",
                color: "white",
                fontSize: "12px",
                padding: "2px 4px",
                height: "18px",
                width: "100%",
                lineHeight: "18px",
                overflow: "hidden",
              },
              title: event.title,
            })}
            components={{
              month: {
                dateHeader: (props) => (
                  <CustomDateHeader {...props} selectedDate={selectedDate} />
                ),
              },
            }}
            date={currentDate}
            onNavigate={handleNavigate}
            onView={(newView) => setView(newView)}
            onSelectEvent={handleEventSelect} // פתיחת דיאלוג בעת לחיצה על משימה
            selectable
            onSelectSlot={(slotInfo) => setSelectedDate(slotInfo.start)} // בחירת יום
          />

          {/* ✅ הצגת משימות לתאריך שנבחר */}
          {selectedDate && (
            <div className="mt-4 p-4 border rounded-lg shadow">
              <h2 className="text-lg font-bold">
                Tasks for {moment(selectedDate).format("MMMM Do, YYYY")}
              </h2>

              {tasksForSelectedDate.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {tasksForSelectedDate.map((task: Event) => (
                    <li
                      key={task.id}
                      className="p-2 border rounded flex justify-between"
                    >
                      <span>{task.title}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEventSelect(task)}
                      >
                        <ViewIcon className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-2">
                  <p className="text-gray-500">No tasks for this day.</p>
                  <Button
                    onClick={() =>
                      router.push(
                        `/tasks/new?date=${moment(selectedDate).format(
                          "YYYY-MM-DD"
                        )}`
                      )
                    }
                    className="flex items-center gap-2"
                  >
                    <PlusCircleIcon className="h-4 w-4" />
                    Add Task
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* ✅ דיאלוג להצגת משימה בלחיצה */}
          {selectedTask && (
            <Dialog
              open={!!selectedTask}
              onOpenChange={() => setSelectedTask(null)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{selectedTask.title}</DialogTitle>
                </DialogHeader>
                <p>
                  <strong>Date:</strong>{" "}
                  {moment(selectedTask.start).format("MMMM Do, YYYY")}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {selectedTask.desc || "No description"}
                </p>
                <div className="flex justify-between mt-4">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => console.log("Edit Task", selectedTask)}
                  >
                    <Edit2Icon className="h-4 w-4" />
                    Edit Task
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex items-center gap-2"
                    onClick={() => handleDeleteTask(selectedTask)}
                  >
                    <Trash2Icon className="h-4 w-4" />
                    Delete Task
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </>
      )}
    </div>
  );
}
