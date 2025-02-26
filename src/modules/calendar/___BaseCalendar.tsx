"use client";

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

const localizer = momentLocalizer(moment);

interface BaseCalendarProps {
  events: Event[];
  currentDate: Date;
  onNavigate: (newDate: Date) => void;
  onViewChange: (view: View) => void;
  onSelectEvent: (event: Event) => void;
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
  view: View;
}

export function BaseCalendar({
  events,
  currentDate,
  onNavigate,
  onViewChange,
  onSelectEvent,
  onSelectDate,
  selectedDate,
  view,
}: BaseCalendarProps) {
  return (
    <Calendar
      localizer={localizer}
      events={events}
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
      date={currentDate}
      components={{
        toolbar: () => null,
      }}
      onNavigate={onNavigate}
      onView={onViewChange}
      onSelectEvent={onSelectEvent}
      selectable
      onSelectSlot={(slotInfo) => onSelectDate(slotInfo.start)}
    />
  );
}
