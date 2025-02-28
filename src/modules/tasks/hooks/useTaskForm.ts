"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useTaskActions } from "@/modules/tasks/hooks/useTaskActions";
import { ITask } from "@/types/ITask";
import { useTasks } from "./useTask";
import { useProducts } from "../../products/hooks/useProduct";

interface UseTaskFormProps {
  product_id: string;
  task_id?: string;
  date?: Date;
}

export function useTaskForm({ product_id, task_id, date }: UseTaskFormProps) {
  const { addMutation, updateMutation } = useTaskActions();
  const router = useRouter();
  const { id: currectPage } = useParams() as { id: string };

  // Fetch Existing Task (if editing)
  const { data, isLoading: taskIsLoading } = useTasks({
    task_id,
    enabled: !!task_id,
  });
  const {
    data: product,
    isLoading: productIsLoading,
    error: productError,
  } = useProducts({ product_id: product_id });

  const emptyTask: ITask = useMemo(
    () => ({
      product_id,
      user_id: "",
      taskName: "",
      description: "",
      lastMaintenance: date || new Date(),
      frequency: 30,
      nextMaintenance: new Date(),
      status: "pending",
    }),
    [product_id, date]
  );

  const [formData, setFormData] = useState<ITask>(emptyTask);

  useEffect(() => {
    if (!task_id) setFormData(emptyTask);
    else if (data?.items[0]) setFormData(data.items[0]);
  }, [task_id, data, emptyTask]);

  //  Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form Submit (Create or Update)
  const mutation = useMutation({
    mutationFn: async () => {
      return task_id
        ? updateMutation.mutateAsync({ task_id, updatedData: formData })
        : addMutation.mutateAsync({ product_id, newTaskData: formData });
    },
    onSuccess: () => {
      setFormData(emptyTask);
      if (
        currectPage &&
        currectPage !== product?.items[0].slug &&
        !productError
      )
        router.push(`/product/${product?.items[0].slug}`);
    },
    onError: (error) => {
      console.error("❌ Error processing task:", error);
    },
  });

  return {
    formData,
    setFormData,
    mutation,
    isFetching: taskIsLoading && productIsLoading,
    handleChange,
  };
}
