"use client";

import { useState } from "react";
import AuthGuard from "@/modules/auth/AuthGuard";
import { AccountSettings } from "@/modules/settings/AccountSettings";
import { SettingsSidebar } from "@/modules/settings/SettingsSidebar";
import { SecuritySettings } from "@/modules/settings/SecuritySettings";
import { NotificationsSettings } from "@/modules/settings/NotificationsSettings";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <AuthGuard>
      <div className="flex-1">
        <div className="max-w-5xl mx-auto p-6 flex gap-6">
          {/* תפריט צדדי */}
          <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          {/* תצוגת התוכן */}
          <div className="flex-1 bg-white shadow-md rounded-lg p-6">
            {activeTab === "account" && <AccountSettings />}
            {activeTab === "security" && <SecuritySettings />}
            {activeTab === "notifications" && <NotificationsSettings />}
          </div>
        </div>{" "}
      </div>
    </AuthGuard>
  );
}
