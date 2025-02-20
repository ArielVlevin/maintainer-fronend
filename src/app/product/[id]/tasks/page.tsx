"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TaskDialog from "@/components/tasks/TaskDialog";
import TaskList from "@/components/tasks/____TaskList";
import { Separator } from "@/components/ui/separator";

export default function ProductPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product id:{id} Tasks</h1>
        <Button variant="outline" onClick={() => router.push("/products")}>
          🔙 חזור לרשימה
        </Button>
      </div>
      <Button onClick={() => setIsOpen(true)}>➕ Add Task</Button>
      <TaskDialog
        product_id={id}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Separator className="my-2" />
      <TaskList productId={id} />
    </div>
  );
}
