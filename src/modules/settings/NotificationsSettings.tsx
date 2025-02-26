"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export function NotificationsSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  });

  const handleToggle = (type: keyof typeof notifications) => {
    setNotifications({ ...notifications, [type]: !notifications[type] });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Email Notifications</span>
          <Switch
            checked={notifications.email}
            onCheckedChange={() => handleToggle("email")}
          />
        </div>
        <div className="flex justify-between items-center">
          <span>Push Notifications</span>
          <Switch
            checked={notifications.push}
            onCheckedChange={() => handleToggle("push")}
          />
        </div>
      </div>
    </div>
  );
}
