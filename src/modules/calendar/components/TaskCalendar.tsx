"use client";

import { useState } from "react";
import { View, Views } from "react-big-calendar";
import moment from "moment";
import { useTaskCalendar } from "@/modules/calendar/hooks/useTaskCalendar";
import { useTaskActions } from "@/modules/tasks/hooks/useTaskActions";
import { BaseCalendar } from "./BaseCalendar";
import { TaskDialog } from "./TaskDialog";
import { CalendarToolbar } from "./CalendarToolbar";
import { TaskCalendarFooter } from "./TaskCalendarFooter";
import { CalendarSkeleton } from "../style/CalendarSkeleton";
import { CalendarEvent } from "@/types/ICalander";

interface TaskCalendarProps {
  productId?: string;
}

export function TaskCalendar({ productId }: TaskCalendarProps) {
  const { deleteMutation } = useTaskActions();

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTask, setSelectedTask] = useState<CalendarEvent | null>(null);
  const [view, setView] = useState<View>("month");

  const { data: events, isLoading, refetch } = useTaskCalendar({ productId });

  const tasksForSelectedDate = selectedDate
    ? events?.filter(
        (event: CalendarEvent) =>
          moment(event.start).format("YYYY-MM-DD") ===
          moment(selectedDate).format("YYYY-MM-DD")
      ) || []
    : [];

  const handleNavigate = (action: "TODAY" | "PREV" | "NEXT") => {
    if (action === "TODAY") {
      const today = new Date();
      setCurrentDate(today);
      setSelectedDate(today);
    } else if (action === "PREV")
      setCurrentDate(
        moment(currentDate)
          .subtract(1, view === "month" ? "months" : "weeks")
          .toDate()
      );
    else if (action === "NEXT")
      setCurrentDate(
        moment(currentDate)
          .add(1, view === "month" ? "months" : "weeks")
          .toDate()
      );
  };

  const handleDeleteTask = async () => {
    if (!selectedTask?._id) return;

    await deleteMutation.mutateAsync(selectedTask._id, {
      onSuccess: () => {
        setSelectedTask(null);
        refetch();
      },
    });
  };

  return (
    <div className="p-4">
      <CalendarToolbar
        className="mb-4"
        label={moment(currentDate).format("MMMM YYYY")}
        availableViews={[Views.MONTH, Views.WEEK]}
        view={view}
        onViewChange={setView}
        onNavigate={handleNavigate}
      />

      {isLoading ? (
        <CalendarSkeleton />
      ) : (
        <>
          <BaseCalendar
            events={events || []}
            currentDate={currentDate}
            onNavigate={setCurrentDate}
            onViewChange={setView}
            onSelectEvent={setSelectedTask}
            onSelectDate={setSelectedDate}
            selectedDate={selectedDate}
            view={view}
          />

          <TaskCalendarFooter
            selectedDate={selectedDate}
            tasksForSelectedDate={tasksForSelectedDate}
            onSelectTask={setSelectedTask}
          />

          <TaskDialog
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onEdit={() => {}}
            onDelete={handleDeleteTask}
          />
        </>
      )}
    </div>
  );
}
