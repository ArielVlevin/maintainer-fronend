"use client";

import { useEffect, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useTaskActions } from "@/modules/tasks/hooks/useTaskActions";
import { useTasks } from "./useTask";
import { useProducts } from "../../products/hooks/useProduct";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../schema/taskFormSchema";
import { ITask } from "@/types/ITask";

interface UseTaskFormProps {
  product_id?: string;
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
  } = useProducts({ product_id });

  const defaultValues: ITask = useMemo(
    () => ({
      product_id: product_id || "",
      user_id: "",
      taskName: "",
      description: "",
      isRecurring: false,
      recurringType: "lastMaintenance",
      status: "healthy",
      frequency: 30,
      maintenanceWindowDates: {
        startDate: date || new Date(),
        endDate: new Date(),
      },
    }),
    [product_id, date]
  );

  const form = useForm<ITask>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    form.setValue("product_id", product_id || "");
  }, [product_id, form]);

  useEffect(() => {
    if (task_id && data?.items[0]) form.reset(data.items[0]);
  }, [task_id, data, form]);

  const mutation = useMutation({
    mutationFn: async (values: ITask) => {
      return task_id
        ? updateMutation.mutateAsync({ task_id, updatedData: values })
        : addMutation.mutateAsync({
            product_id: values.product_id,
            newTaskData: values,
          });
    },
    onSuccess: () => {
      form.reset(defaultValues);
      if (
        currectPage &&
        currectPage !== product?.items[0].slug &&
        !productError
      ) {
        router.push(`/product/${product?.items[0].slug}`);
      }
    },
    onError: (error) => {
      console.error("❌ Error processing task:", error);
    },
  });

  return {
    form,

    mutation,
    isFetching: taskIsLoading || productIsLoading,
  };
}
