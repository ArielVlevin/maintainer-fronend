"use client";

import TaskForm from "@/components/tasks/__TaskForm";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NewTaskPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  if (!id) return <p className="text-red-500"> שגיאה: לא נמצא מזהה מוצר.</p>;

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">➕ הוסף משימה למוצר</h1>
        <Button
          variant="outline"
          onClick={() => router.push(`/products/${id}`)}
        >
          🔙 חזור
        </Button>
      </div>
      <TaskForm productId={id} />
    </div>
  );
}
