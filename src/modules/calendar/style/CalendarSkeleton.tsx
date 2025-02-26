import { cn } from "@/lib/utils";

export function CalendarSkeleton() {
  return (
    <div className="animate-pulse grid grid-cols-7 gap-1 p-4 border rounded-lg bg-white shadow-sm">
      {/* Header Days */}
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div
          key={day}
          className="p-2 text-center font-semibold bg-gray-200 rounded-md"
        >
          {day}
        </div>
      ))}

      {/* Grid of days */}
      {Array.from({ length: 42 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-16 bg-gray-100 rounded-md flex items-center justify-center",
            index % 7 === 0 ? "bg-gray-200" : ""
          )}
        >
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        </div>
      ))}
    </div>
  );
}
