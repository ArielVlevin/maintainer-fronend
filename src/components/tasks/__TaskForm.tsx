"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTaskToProduct } from "@/api/product";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TaskFormProps {
  productId: string;
}

export default function TaskForm({ productId }: TaskFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    lastMaintenance: "",
    frequency: 30,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      await addTaskToProduct(productId, {
        ...formData,
        frequency: Number(formData.frequency),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", productId] });
      queryClient.invalidateQueries({ queryKey: ["products"] }); // לעדכן גם את רשימת המוצרים
      router.push(`/products/${productId}`); // חזרה לעמוד המוצר
    },
  });

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>➕ הוסף משימה</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
          className="space-y-4"
        >
          <Input
            type="text"
            name="taskName"
            placeholder="שם המשימה"
            value={formData.taskName}
            onChange={(e) =>
              setFormData({ ...formData, taskName: e.target.value })
            }
            required
          />
          <Input
            type="text"
            name="description"
            placeholder="תיאור (אופציונלי)"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <Input
            type="date"
            name="lastMaintenance"
            placeholder="תאריך ביצוע אחרון"
            value={formData.lastMaintenance}
            onChange={(e) =>
              setFormData({ ...formData, lastMaintenance: e.target.value })
            }
            required
          />
          <Input
            type="number"
            name="frequency"
            placeholder="תדירות (בימים)"
            value={formData.frequency}
            onChange={(e) =>
              setFormData({ ...formData, frequency: Number(e.target.value) })
            }
            required
          />
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full"
          >
            {mutation.isPending ? "מוסיף..." : "✅ הוסף משימה"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
