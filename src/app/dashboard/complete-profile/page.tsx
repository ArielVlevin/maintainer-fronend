"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CompleteProfile() {
  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // כאן אתה יכול לשלוח את המידע ל-Backend כדי לעדכן את הפרופיל של המשתמש

    router.push("/dashboard"); // לאחר השלמת הפרופיל, שלח ל-Dashboard
  };

  return (
    <AuthGuard>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Complete Your Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border p-2 w-full"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border p-2 w-full"
            type="email"
            placeholder="Email"
            value={email}
            disabled
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="submit"
          >
            Save Profile
          </button>
        </form>
      </div>
    </AuthGuard>
  );
}
