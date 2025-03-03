import { FormProvider, useWatch } from "react-hook-form";
import FormDialog from "@/components/dialog/FormDialog";
import TaskFields from "../components/TaskFields";
import FormSelect from "@/components/input/FormSelect";
import { useProducts } from "@/modules/products/hooks/useProduct";
import { useTaskForm } from "../hooks/useTaskForm";
import { useEffect } from "react";

interface TaskDialogProps {
  product_id?: string;
  task_id?: string;
  date?: Date;
  open: boolean;
  onClose: () => void;
}

export default function TaskDialog({
  product_id,
  task_id,
  date,
  open,
  onClose,
}: TaskDialogProps) {
  const { data, isLoading } = useProducts({});

  const { form, mutation, isFetching } = useTaskForm({
    product_id,
    task_id,
    date,
  });

  const selectedProduct_id = useWatch({
    control: form.control,
    name: "product_id",
  });

  useEffect(() => {
    if (product_id && !form.getValues("product_id")) {
      form.setValue("product_id", product_id);
    }
  }, [product_id, form]);

  return (
    <FormProvider {...form}>
      <FormDialog
        title={task_id ? "Edit Task" : "Add Task"}
        open={open}
        onClose={onClose}
        onConfirm={form.handleSubmit((values) => {
          mutation.mutate(values, {
            onSuccess: () => onClose(),
          });
        })}
        confirmText={task_id ? "Save Changes" : "Add Task"}
        disabled={isFetching}
      >
        {/* ✅ Select Product Dropdown */}
        {!product_id && (
          <FormSelect
            label="Select Product"
            name="product_id"
            value={selectedProduct_id}
            onChange={(value) => form.setValue("product_id", value as string)}
            disabled={isLoading}
            options={
              data?.items?.map((product) => ({
                label: product.name,
                value: product._id ? String(product._id) : "",
              })) || []
            }
          />
        )}
        {selectedProduct_id && <TaskFields />}
      </FormDialog>
    </FormProvider>
  );
}

/*

export default function TaskDialog({
  product_id,
  task_id,
  date,
  open,
  onClose,
}: TaskDialogProps) {
  const { data, isLoading } = useProducts({});

  const form = useForm<TaskFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_id: product_id || "",
      task_id: task_id || "",
      taskName: "",
      description: "",
      isRecurring: false,
      recurringType: "lastMaintenance",
      status: "healthy",
      maintenanceWindowDates: {
        startDate: date ? date : undefined,
        endDate: undefined,
      },
    },
  });

  const onSubmit = async (values: TaskFormData) => {
    console.log("Submitting task:", values);
    onClose();
  };

  return (
    <FormProvider {...form}>
      <FormDialog
        title={task_id ? "Edit Task" : "Add Task"}
        open={open}
        onClose={onClose}
        onConfirm={form.handleSubmit(onSubmit)}
        confirmText={task_id ? "Save Changes" : "Add Task"}
      >
        {!product_id && (
         <FormSelect
           label="Select Product"
           name="product_id"
           value={form.watch("product_id")}
           onChange={(value) => form.setValue("product_id", value as string)}
           disabled={isLoading}
           options={
             data?.items?.map((product) => ({
               label: product.name,
               value: product._id ? String(product._id) : "",
             })) || []
           }
         />
       )}
       <TaskFields />
     </FormDialog>
   </FormProvider>
 );
}
*/
