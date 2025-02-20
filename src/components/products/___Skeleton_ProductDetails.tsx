import { Skeleton } from "@/components/ui/skeleton";

/**
 * @component Skeleton_ProductDetails
 * @description Displays a skeleton loader for the ProductDetails page while data is being fetched.
 *
 * @returns {JSX.Element} The rendered skeleton component.
 */
export function Skeleton_ProductDetails() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Product Image Skeleton */}
      <div className="flex justify-center">
        <Skeleton className="w-[100px] h-[100px] rounded-md" />
      </div>

      {/* Product Information Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-2/4" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>

      {/* Maintenance Information Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-2/4" />
      </div>
    </div>
  );
}
