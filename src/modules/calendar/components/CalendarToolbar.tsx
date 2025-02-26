import { Views, View } from "react-big-calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CalendarToolbarProps {
  label: string;
  view: View;
  availableViews?: View[];
  onViewChange: (view: View) => void;
  onNavigate: (action: "TODAY" | "PREV" | "NEXT") => void;
  className?: string;
}

export function CalendarToolbar({
  label,
  view,
  availableViews = [Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA],
  onViewChange,
  onNavigate,
  className,
}: CalendarToolbarProps) {
  return (
    <div
      className={cn(
        "flex justify-between items-center p-4 bg-white rounded-md shadow-sm",
        className
      )}
    >
      {/* 🔹 כפתורי ניווט */}
      <div className="flex gap-2">
        <Button onClick={() => onNavigate("TODAY")}>Today</Button>
        <Button onClick={() => onNavigate("PREV")}>Back</Button>
        <Button onClick={() => onNavigate("NEXT")}>Next</Button>
      </div>

      {/* 🔹 שם החודש */}
      <h2 className="text-lg font-semibold">{label}</h2>

      {/* 🔹 כפתורים לבחירת תצוגה */}
      <div className="flex gap-2">
        {availableViews.map((v) => (
          <Button
            key={v}
            onClick={() => onViewChange(v)}
            variant={view === v ? "default" : "secondary"}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
}
