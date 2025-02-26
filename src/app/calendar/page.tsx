"use client";

import { motion } from "framer-motion";
import AuthGuard from "@/components/auth/AuthGuard";
import { TaskCalendar } from "@/modules/calendar/components/TaskCalendar";

export default function CalendarPage() {
  return (
    <AuthGuard>
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <TaskCalendar />
        </motion.div>
      </div>
    </AuthGuard>
  );
}
