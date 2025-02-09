import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { JSX } from "react";

/**
 * A skeleton placeholder component for the `ProductCardPhone` component.
 * This component is used to display a loading state while product data is being fetched.
 *
 * @component
 * @returns {JSX.Element} A skeleton placeholder for the product card in phone view.
 */
export function Skeleton_ProductCardPhone(): JSX.Element {
  return (
    <Card className="w-[180px] h-[240px] min-w-[180px] min-h-[240px] max-w-[180px] max-h-[240px] flex flex-col shadow-md">
      <CardContent className="flex-grow p-2 relative flex flex-col items-center">
        {/* Avatar & Menu Placeholder */}
        <div className="flex items-center justify-between w-full mb-8">
          <Skeleton className="w-6 h-6 rounded-md" />
        </div>

        {/* Product Info Placeholder */}
        <div className="text-center flex flex-col items-center">
          <Skeleton className="h-10 w-10 rounded-full mb-2" />
          <Skeleton className="h-4 w-24 mb-1 rounded" />
          <Skeleton className="h-3 w-20 rounded" />
        </div>

        {/* Maintenance Info Placeholder */}
        <div className="grid gap-1 text-[10px] mt-2 w-full">
          <Skeleton className="h-6 w-full rounded-md bg-green-50" />
          <Skeleton className="h-6 w-full rounded-md bg-red-50" />
        </div>
      </CardContent>

      {/* Action Buttons Placeholder */}
      <CardFooter className="p-2">
        <div className="grid grid-cols-2 gap-1 w-full">
          <Button size="sm" className="text-[10px] h-6 px-1" disabled>
            <Skeleton className="h-4 w-4 rounded-md" />
          </Button>
          <Button size="sm" className="text-[10px] h-6 px-1" disabled>
            <Skeleton className="h-4 w-4 rounded-md" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
