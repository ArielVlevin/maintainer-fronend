import { cn } from "@/lib/utils";

interface SettingsSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function SettingsSidebar({
  activeTab,
  setActiveTab,
}: SettingsSidebarProps) {
  const tabs = [
    { key: "account", label: "Account Settings" },
    { key: "security", label: "Security" },
    { key: "notifications", label: "Notifications" },
  ];

  return (
    <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Settings</h2>
      <ul>
        {tabs.map((tab) => (
          <li key={tab.key}>
            <button
              className={cn(
                "w-full text-left p-2 rounded-lg transition",
                activeTab === tab.key
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              )}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
