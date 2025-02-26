"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/authContext";
import { Info } from "lucide-react";

export function AccountSettings() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saving:", formData);
    // כאן תוסיף קריאה ל-API לעדכון הנתונים
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <Input name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium flex items-center gap-1">
            Email
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-500 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent className="bg-white text-black shadow-lg p-2 rounded-md">
                  <p className="font-semibold">
                    This is the email where reminders will be sent. <br />
                    You will need to verify your email.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </label>

          <Input name="email" value={formData.email} onChange={handleChange} />
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}
