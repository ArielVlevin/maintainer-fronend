import { Event } from "react-big-calendar";

export interface CalendarEvent extends Event {
  _id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  product: {
    _id: string;
    name: string;
  };
}
