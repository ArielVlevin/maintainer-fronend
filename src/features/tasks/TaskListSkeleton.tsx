import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * @component TaskListSkeleton
 * @description Displays a skeleton loading state for the task list.
 */
export default function TaskListSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">
            <Skeleton className="h-6 w-40" />
          </CardTitle>
          <Skeleton className="h-8 w-24 rounded" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b py-3"
            >
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-5 w-24" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
