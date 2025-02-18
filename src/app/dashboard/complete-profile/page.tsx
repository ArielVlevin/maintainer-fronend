"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyUser } from "@/api/auth";
import { useAuth } from "@/context/authContext";
import AuthGuard from "@/components/auth/AuthGuard";
import { delay } from "@/lib/utils";

export default function NewUserPage() {
  const router = useRouter();
  const { user, refreshUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    name: user?.name || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        name: user.name || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * ✅ שולח את הנתונים המעודכנים ל-backend רק בלחיצת שמירה
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!user?._id) throw new Error("User ID is missing");

      await verifyUser({
        _id: user._id,
        name: formData.name,
        email: formData.email,
      });
      await refreshUser();
      await delay(2000);
      router.push("/dashboard");
    } catch (error) {
      console.error("❌ Failed to update user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <div>
        <h1 className="text-2xl font-bold">Complete Your Profile</h1>
        <p>Welcome {user?.name || "Guest"}, please complete your profile.</p>

        {/* ✅ טופס עדכון פרופיל */}
        <form className="mt-6" onSubmit={handleSubmit}>
          <label className="block">
            Full Name:
            <input
              type="text"
              name="name"
              className="border p-2 w-full"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label className="block mt-4">
            Email:
            <input
              type="email"
              name="email"
              className="border p-2 w-full"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded mt-4"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </AuthGuard>
  );
}
