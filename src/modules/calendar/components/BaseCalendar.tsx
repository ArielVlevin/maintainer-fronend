import { View } from "react-big-calendar";
import moment from "moment";
import { cn } from "@/lib/utils";
import { CalendarEvent } from "@/types/ICalander";

interface BaseCalendarProps {
  events: CalendarEvent[];
  currentDate: Date;
  onNavigate: (date: Date) => void;
  onViewChange: (view: View) => void;
  onSelectEvent: (event: CalendarEvent) => void;
  onSelectDate: (date: Date) => void;
  selectedDate: Date;
  view: View;
}

/** 🔹 Renders the header row with the days of the week */
function CalendarHeader() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="grid grid-cols-7 gap-1 mb-1">
      {days.map((day) => (
        <div
          key={day}
          className="p-2 text-center font-semibold bg-gray-200 rounded-md"
        >
          {day}
        </div>
      ))}
    </div>
  );
}

/** 🔹 Renders a single day cell, with events if they exist */
function CalendarDay({
  day,
  isSelected,
  isCurrentMonth,
  eventsForDay,
  onSelectDate,
}: {
  day: moment.Moment;
  isSelected: boolean;
  isCurrentMonth: boolean;
  eventsForDay: CalendarEvent[];
  onSelectDate: (date: Date) => void;
}) {
  return (
    <div
      key={day.format("YYYY-MM-DD")}
      className={cn(
        "h-20 p-2 rounded-md flex flex-col items-center justify-start cursor-pointer transition-all",
        {
          "bg-primary text-white font-bold": isSelected,
          "bg-gray-300 text-gray-400 cursor-not-allowed": !isCurrentMonth,
          "bg-gray-100": isCurrentMonth && !isSelected,
        }
      )}
      onClick={() => isCurrentMonth && onSelectDate(day.toDate())}
    >
      <span>{day.format("D")}</span>

      {/* Render up to 2 events inside the day */}
      {isCurrentMonth &&
        eventsForDay.slice(0, 2).map((event) => (
          <div
            key={event._id}
            className="w-full text-xs bg-blue-800 text-white rounded px-2 py-1 mt-1 truncate"
          >
            {event.title}
          </div>
        ))}

      {/* Show "+X more" if there are too many events */}
      {isCurrentMonth && eventsForDay.length > 2 && (
        <span className="text-xs text-gray-500 mt-1">
          +{eventsForDay.length - 2} more
        </span>
      )}
    </div>
  );
}

/** 🔹 Main Calendar Component */
export function BaseCalendar({
  events,
  currentDate,
  onSelectDate,
  selectedDate,
}: BaseCalendarProps) {
  const startOfMonth = moment(currentDate).startOf("month");
  const startOfWeek = startOfMonth.startOf("week");
  const days = Array.from({ length: 42 }).map((_, index) =>
    moment(startOfWeek).add(index, "days")
  );

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      {/* 🔹 Render Header */}
      <CalendarHeader />

      {/* 🔹 Render Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isSelected = day.isSame(selectedDate, "day");
          const isCurrentMonth = day.month() === moment(currentDate).month();
          const eventsForDay = events.filter((event) =>
            moment(event.start).isSame(day, "day")
          );

          return (
            <CalendarDay
              key={day.format("YYYY-MM-DD")}
              day={day}
              isSelected={isSelected}
              isCurrentMonth={isCurrentMonth}
              eventsForDay={eventsForDay}
              onSelectDate={onSelectDate}
            />
          );
        })}
      </div>
    </div>
  );
}
