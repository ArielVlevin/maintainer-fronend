"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SecuritySettings() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Updating password...", formData);
    // כאן תוסיף קריאה ל-API לעדכון הסיסמה
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Security</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-medium">Current Password</label>
          <Input
            name="currentPassword"
            type="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-medium">New Password</label>
          <Input name="newPassword" type="password" onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium">Confirm New Password</label>
          <Input
            name="confirmPassword"
            type="password"
            onChange={handleChange}
          />
        </div>
        <Button onClick={handleSave}>Update Password</Button>
      </div>
    </div>
  );
}
